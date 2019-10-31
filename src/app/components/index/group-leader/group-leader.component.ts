import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-group-leader',
  templateUrl: './group-leader.component.html',
  styleUrls: ['./group-leader.component.scss'],
})
export class GroupLeaderComponent implements OnInit {
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
  // 公告通知数据
  public groupLeaderNotices = [];

  //企业自评信息
  public selfAccess :any = {
    accessedNum:0,
    heighLevel:'',
    heighLevel_code:'',
    lowLevel:'',
    lowLevel_code:'',
    heighsum:0,
    lowsum:0
  };

  @ViewChild("slide", { static: false }) slide;

  constructor( public http:HttpService) { }


  ngOnInit() {
    this.getEcharts();
    this.getNotice();
    this.getSelfAssess();
  }
  getEcharts() {
    this.echarts = echarts.init(document.querySelector('#main'));
    this.options = {
        baseOption: { // 这里是基本的『原子option』。
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
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
                    {value: 1, name: '一级'},
                    {value: 3, name: '二级'},
                    {value: 7, name: '三级'},
                    {value: 4, name: '四级'},
                    {value: 5, name: '五级'}
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
      },
      // media: [ 
      //   {
          // query: {
            // minWidth: 0,
            // minWidth: 310,
            // maxHeight: 310,
            // minAspectRatio: 1.3
          // },   
      //     option: {       
      //       tooltip: {
      //         trigger: 'item',
      //         formatter: "{a} <br/>{b} : {c} ({d}%)"
      //     },
      //     // color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
      //     stillShowZeroSum: false,
      //     legend: {
      //       orient: 'vertical',
      //       x: 'left',
      //       y: 'top',
      //       itemWidth: 15,   // 设置图例图形的宽
      //       itemHeight: 8,  // 设置图例图形的高
      //       textStyle: {
      //         color: '#000000'  // 图例文字颜色
      //       },
      //       itemGap: 12,
      //       data: ['一级','二级','三级','四级','五级']
      //     },
      //     series: [
      //         {
      //             type: 'pie',
      //             radius: '55%',
      //             center: ['50%', '50%'],
      //             data: [
      //                 {value: 1, name: '一级'},
      //                 {value: 3, name: '二级'},
      //                 {value: 7, name: '三级'},
      //                 {value: 4, name: '四级'},
      //                 {value: 5, name: '五级'}
      //             ],
      //             itemStyle: {
      //                 emphasis: {
      //                     shadowBlur: 10,
      //                     shadowOffsetX: 0,
      //                     shadowColor: 'rgba(128, 128, 128, 0.5)'
      //                 }
      //             }
      //         }
      //     ],
      //     label:{
      //       normal: {
      //         position: 'inner', 
      //         formatter: '{c}'
      //       }
      //     }
      //     }
      //   }
      // ]
    }
    this.echarts.setOption(this.options)
    window.onresize = this.echarts.resize; 
  }
  // 获取企业自评数据
  getSelfAssess(){
    this.http.getRequest('/specification_evaluations').then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.accessedNum = response.length;
      }
    });
    //统计最高达级信息
    this.http.getRequest('/specification_evaluations?sort=-evaluation_level_code').then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.heighLevel = response[0].evaluation_level.name;
        this.selfAccess.heighLevel_code = response[0].evaluation_level.code;
        this.http.getRequest('/specification_evaluations?evaluation_level_code='+this.selfAccess.heighLevel_code).then((response:any) => {
          if(response && response.length > 0){
            this.selfAccess.heighsum = response.length;
          }
        });
      }
    });
    //统计最低达级信息
    this.http.getRequest('/specification_evaluations?sort=evaluation_level_code').then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.lowLevel = response[0].evaluation_level.name;
        this.selfAccess.lowLevel_code = response[0].evaluation_level.code;
        this.http.getRequest('/specification_evaluations?evaluation_level_code='+this.selfAccess.lowLevel_code).then((response:any) => {
          if(response && response.length > 0){
            // console.log(response)
            this.selfAccess.lowsum = response.length;
          }
        });
      }
    });
  }
  // 获取公告通知数据
  getNotice(){
    this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
      if(response && response.length > 0){
        this.groupLeaderNotices = response;
      }
    });
  }
  // 解决手动滑动后轮播图无法正常轮播
  touchEnd() {
    this.slide.startAutoplay();
  }
  // 请求数据完成后如果轮播图工作异常，调用该方法
  update() {
    this.slide.update();
  }
}
