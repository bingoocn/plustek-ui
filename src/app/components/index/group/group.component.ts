import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  //当前登录人单位Id
  public unitId: string;
  public role: any;
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
  // 最新评价
  // public news = {
  //   id:'8ae4af936df2617b016df2ce68f10008',
  //   notice:'各单位抓紧完成企业自评工作，保证精益管理工作稳步进行',
  //   date:'2019-09-10'
  // };
  // 公告通知数据
  public GroupNotice = [];
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
    checkTime:'',
    heighLevel:'暂无',
    lowLevel:'暂无',
    heighsum:0,
    lowsum:0
  };
  public myWork :any = {
    unAssess:0,
    assessed:0
  }
  @ViewChild("slide", { static: false }) slide;

  constructor( public http:HttpService,public common: CommonService) { }

  ngOnInit() {
    this.unitId = window.localStorage.getItem("unitId");
    this.getExpertAssess();
    this.getSelfAssess();
    this.getMyWork();
    this.getNotice();
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
  getMyWork(){
    this.http.getRequest('/specification_mon_evaluations').then((response:any) => {
      if(response && response.length > 0){
        // 遍历每条数据，区分当前登录人当前角色未评价、已评价
        response.forEach(element => {
          if(element.id){
            // 从session里获取当前登录人的当前角色信息
            const currentRole = JSON.parse(localStorage.getItem('currentRole'));
            if(currentRole && currentRole.guid){
              // 获取系统运行参数表查找与当前登录人当前角色id相匹配的信息
              const params = {param_name:currentRole.guid};
              this.http.getRequest('/sys_param',params).then((response:any) => {
                if(response && response.param_value){
                  this.role = JSON.parse(response.param_value);
                  if(this.role.abbreviation){
                    var monitor = '';
                    if(this.role.abbreviation === 'JTYWBM'){
                      monitor = '/top_group_monitor'
                    }
                    if(this.role.abbreviation === 'ZJTYWBM'){
                      monitor = '/sub_group_monitor'
                    }
                    if(monitor !== ''){
                      this.http.getRequest('/specification_evaluations/' + element.id + monitor).then((response:any) => {
                        if(response && response.mon_approval_content){
                          this.myWork.assessed ++
                        }else{
                          this.myWork.unAssess ++
                        }
                      })
                    }
                  }
                }
              })
            }
          }
        });
      }
    });
  }
  // 获取公告通知数据
  getNotice(){
  this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
    if(response && response.length > 0){
      this.GroupNotice = response;
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
