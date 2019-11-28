import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-group-leader',
  templateUrl: './group-leader.component.html',
  styleUrls: ['./group-leader.component.scss'],
})
export class GroupLeaderComponent implements OnInit {
  //当前登录人单位Id
  public unitId: string;
  public echarts : any;
  public options :any;
  // 规范评价进度配置
  public slideOpts:any = {
    effect: 'flip', 
    speed: 400, 
    loop:false, 
    autoplay: { delay: 2000 }, 
    pager: false
  }
  // 公告通知配置
  public noticeOpts:any = {
    effect: 'flip', 
    speed: 400, 
    loop:false, 
    direction: 'vertical',
    autoplay: { delay: 2000 }, 
    pager: false
  }
  // 专家检查数据
  public groupLeaderNotices = [];

  //企业自评信息
  public selfAccess :any = {
    accessedNum:0,
    heighLevel:'暂无',
    heighLevel_code:'',
    lowLevel:'暂无',
    lowLevel_code:'',
    heighsum:0,
    lowsum:0
  };
  //专家检查信息
  public expertAssess :any = {
    checkedNum:0,
    checkTime:'暂无',
    heighLevel:'暂无',
    lowLevel:'暂无',
    heighsum:0,
    lowsum:0
  };
  public option: any = {
    baseOption: {
      tooltip: {
          trigger: 'item',
      },
    // color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
    stillShowZeroSum: false,
    legend: {
      orient: 'vertical',
      x: 'right',
      y: 'top',
      itemWidth: 15,   // 设置图例图形的宽
      itemHeight: 8,  // 设置图例图形的高
      textStyle: {
        color: '#000000'  // 图例文字颜色
      },
      itemGap: 12,
      data: ['一级','二级','三级','四级','五级']
    },
    series: [
        {
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [
                {value: 0, name: '一级'},
                {value: 0, name: '二级'},
                {value: 0, name: '三级'},
                {value: 0, name: '四级'},
                {value: 0, name: '五级'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(128, 128, 128, 0.5)'
                }
            }
        }
    ],
    label:{
      normal: {
        position: 'inner', 
        formatter: '{c}'
      }
    }
  }
}

  @ViewChild("slide", { static: false }) slide;

  constructor( public http:HttpService,public common: CommonService) { }

  ngOnInit() {
    this.unitId = window.localStorage.getItem("unitId");
    this.getEcharts();
    this.getExpertAssess();
    this.getSelfAssess();
  }
  getEcharts() {
    this.echarts = echarts.init(document.querySelector('#main'));
    this.http.getRequest('/specification_evaluations?evaluation_status_code=05&apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        let levelCodeArr = [];
        response.forEach(item => {
          if(item.evaluation_level !== null){
            levelCodeArr.push(item.evaluation_level.code);
          }
        });
        this.option.baseOption.series[0].data[0].value = this.common.countNum(levelCodeArr,'01')
        this.option.baseOption.series[0].data[1].value = this.common.countNum(levelCodeArr,'02')
        this.option.baseOption.series[0].data[2].value = this.common.countNum(levelCodeArr,'03')
        this.option.baseOption.series[0].data[3].value = this.common.countNum(levelCodeArr,'04')
        this.option.baseOption.series[0].data[4].value = this.common.countNum(levelCodeArr,'05')
        this.echarts.setOption(this.option)
      }
    });
    window.onresize = this.echarts.resize; 
  }
  //获取专家检查数据
  getExpertAssess() {
    this.http.getRequest('/expert_reviews?sort=-check_end_time&apply_id'+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        this.expertAssess.checkTime = response[0].check_end_time;
        //根据单位去重
        let resArr = response;
        let unitArr = [];
        let standard_Level = [];

        unitArr = resArr.reduce(function(prev,element){
          if(!prev.find(el=>el.unit.id==element.unit.id)) {
            prev.push(element)
          }
          return prev
        },[])
        this.expertAssess.checkedNum = unitArr.length;
        //获取最高/低达级
        response.forEach(item => {
          if(item.evaluation_result.standard_result !== null){
            standard_Level.push(Number(item.evaluation_result.standard_result.code));
            this.groupLeaderNotices.push({
              id:item.id,
              level:item.evaluation_result.standard_result.name ? item.evaluation_result.standard_result.name :'暂无',
              date:item.check_end_time,
              unit:item.unit.name
            })
          }
        });
        //获取最高/低达级单位数量
        if(standard_Level.length > 0){
          let newstandard_Level = standard_Level.reduce(function(prev,element){
            if(!prev.find(el=>el==element)) {
              prev.push(element)
            }
            return prev
          },[])
          this.expertAssess.heighLevel = Math.max(...standard_Level)
          this.expertAssess.heighsum = this.common.countNum(newstandard_Level,this.expertAssess.heighLevel)
          this.expertAssess.heighLevel = this.common.convertToChinaNum(Math.max(...standard_Level))
        }

      }
    });
  }
  // 获取企业自评数据
  getSelfAssess(){
    this.http.getRequest('/specification_evaluations?evaluation_status_code=05&apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        let resArr = response;
        let unitArr = resArr.reduce(function(prev,element){
          if(!prev.find(el=>el.unit.id==element.unit.id)) {
            prev.push(element)
          }
          return prev
        },[])
        this.selfAccess.accessedNum = unitArr.length;
      }
    });
    //统计最高达级信息
    this.http.getRequest('/specification_evaluations?evaluation_status_code=05&sort=-evaluation_level_code&apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.heighLevel = response[0].evaluation_level.name;
        if(response[0].evaluation_level.name == ''){
          this.selfAccess.heighsum = 0;
        }else{
          this.selfAccess.heighLevel_code = response[0].evaluation_level.code;
          this.http.getRequest('/specification_evaluations?evaluation_status_code=05&evaluation_level_code='+this.selfAccess.heighLevel_code+'&apply_id='+ this.unitId).then((response:any) => {
            if(response && response.length > 0){
              let  heighsumArr = response.reduce(function(prev,element){
                if(!prev.find(el=>el.unit.id==element.unit.id)) {
                  prev.push(element)
                }
                return prev
              },[])
              this.selfAccess.heighsum = heighsumArr.length;
              //统计最低达级信息
              this.http.getRequest('/specification_evaluations?evaluation_status_code=05&sort=evaluation_level_code&apply_id='+ this.unitId).then((response:any) => {
                if(response && response.length > 0){
                  if(this.selfAccess.heighLevel !== '一级'){
                    this.selfAccess.lowLevel = response[0].evaluation_level.name;
                    this.selfAccess.lowLevel_code = response[0].evaluation_level.code;
                    this.http.getRequest('/specification_evaluations?evaluation_status_code=05&evaluation_level_code='+this.selfAccess.lowLevel_code).then((response:any) => {
                      if(response && response.length > 0){
                        let  lowsumArr = response.reduce(function(prev,element){
                          if(!prev.find(el=>el.unit.id==element.unit.id)) {
                            prev.push(element)
                          }
                          return prev
                        },[])
                        this.selfAccess.lowsum = lowsumArr.length;
                      }
                    });
                  }
                }
              });
            }
          });
        }
      }
    });
  }
  // 获取公告通知数据
  // getNotice(){
  //   this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
  //     if(response && response.length > 0){
  //       this.groupLeaderNotices = response;
  //     }
  //   });
  // }
  // 解决手动滑动后轮播图无法正常轮播
  touchEnd() {
    this.slide.startAutoplay();
  }
  // 请求数据完成后如果轮播图工作异常，调用该方法
  update() {
    this.slide.update();
  }
}
