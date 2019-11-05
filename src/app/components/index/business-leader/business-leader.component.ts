import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-business-leader',
  templateUrl: './business-leader.component.html',
  styleUrls: ['./business-leader.component.scss'],
})
export class BusinessLeaderComponent implements OnInit {
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
  public news = {
    id:'8ae4af936df2617b016df2ce68f10008',
    notice:'各单位抓紧完成企业自评工作，保证精益管理工作稳步进行',
    date:'2019-09-10'
  };
  // 公告通知数据
  public businessNotice = [];
  // 轮播图数据
  public slides = [
    {
      self: 0,
      department: 0,
      leader: 0
    },
    {
      subGroup: 0,
      group: 0
    },
    {
      lesdersubGroup: 0,
      lesdergroup: 0
    }
  ];
  // 自评结果数据
  public selfEvaluations = {
    id:'',
    level: '',
    score: '',
    time: ''
  }
  public myWork = {
    unCheck: 0,
    checked: 0
  }
  public is_business_leader:boolean = false;//部门领导角色
  public is_apart_leader:boolean = false;//分管领导角色

  @ViewChild("slide", { static: false }) slide;

  constructor( public http:HttpService) {
    // 从session里获取当前登录人的当前角色信息
    const currentRole = JSON.parse(localStorage.getItem('roles'));

    if(currentRole && currentRole[0].guid){
      // 获取系统运行参数表查找与当前登录人当前角色id相匹配的信息
      const params = {param_name:currentRole[0].guid};
      this.http.getRequest('/sys_param',params).then((response:any) => {
        if(response && response.param_value){
          var role = JSON.parse(response.param_value);
          if(role.abbreviation){
            this.http.getRequest('/specification_evaluations').then((response:any) => {
              if(response){
                let checkedArr = [];
                let unCheckedArr = [];
                if(role.abbreviation === 'QYBMLD'){
                  this.is_business_leader = true;
                  response.forEach( item=>{
                    if(item.evaluation_status !== null && item.evaluation_status.code == '03'){
                      checkedArr.push(item);
                    }
                    if(item.evaluation_status !== null && item.evaluation_status.code == '01' || item.evaluation_status.code == '02'){
                      unCheckedArr.push(item);
                    }
                  })
                  this.myWork.checked = checkedArr.length;
                  this.myWork.unCheck = unCheckedArr.length;
                }
                if(role.abbreviation === 'QYFGLD'){
                  this.is_apart_leader = true;
                  response.forEach( item=>{
                    if(item.evaluation_status !== null && item.evaluation_status.code == '05'){
                      checkedArr.push(item);
                    }
                    if(item.evaluation_status !== null && item.evaluation_status.code == '01' || item.evaluation_status.code == '02'){
                      unCheckedArr.push(item);
                    }
                  })
                  this.myWork.checked = checkedArr.length;
                  this.myWork.unCheck = unCheckedArr.length;
                }
              }
            })
          }
        }
      })
    }
   }

  ngOnInit() {
    this.getSlides();
    this.getNotice();
    this.getSelfAssess();
  }
  getSlides() {
    //规范评价
    this.http.getRequest('/specification_evaluations').then((response:any) => {
      if(response && response.length > 0){
        this.slides[0].self = response.length;
        response.forEach(item=>{
          //子集团
          if(item.evaluation_status.code == '03'){
            this.slides[0].department ++
          }
          //集团
          if(item.evaluation_status.code == '05'){
            this.slides[0].leader ++
          }
        })
      }
    });
    //监控评价
    this.http.getRequest('/specification_mon_evaluations').then((response:any) => {
      if(response && response.length > 0){
        for(let i=0;i<response.length;i++){
          if(response[i].ent_self_eva_mon_approvals.length > 0){
            for(let n=0;n<response[i].ent_self_eva_mon_approvals.length;n++){
              //子集团评价
              if(response[i].ent_self_eva_mon_approvals[n].mon_approval_type.code == '01'){
                this.slides[1].subGroup ++
              }
              //集团评价
              if(response[i].ent_self_eva_mon_approvals[n].mon_approval_type.code == '02'){
                this.slides[1].group ++
              }
            }
          }
        }
      }
    });
    //领导阅评
    this.http.getRequest('/specification_mon_evaluations?leader_review_type_code=01').then((response:any) => {
        this.slides[2].group = response.length;
    });
    this.http.getRequest('/specification_mon_evaluations?leader_review_type_code=02').then((response:any) => {
        this.slides[2].subGroup = response.length;
    });
  }
  // 获取企业自评数据
  getSelfAssess(){
    this.http.getRequest('/specification_evaluations?sort=-evaluation_date').then((response:any) => {
      if(response && response.length > 0){
        this.selfEvaluations.id = response[0].id;
        this.selfEvaluations.level = response[0].evaluation_level.name;
        this.selfEvaluations.score = response[0].self_score;
        this.selfEvaluations.time = response[0].evaluation_date;
      }
    });
  }
  // 获取公告通知数据
  getNotice(){
    this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
      if(response && response.length > 0){
        this.businessNotice = response;
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
