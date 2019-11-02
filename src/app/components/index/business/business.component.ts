import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
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
    id:'01',
    notice:'该单位精益管理工作良好，继续努力',
    date:'2019-09-10'
  };
  // 公告通知数据
  public noticeSlides = [];

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
      department: 0,
      leader: 0
    }
  ];
  // 自评结果数据
  public selfEvaluations = {
    id:'',
    level: '',
    score: '',
    time: ''
  }

  @ViewChild("slide", { static: false }) slide;
  
  constructor( public http:HttpService) { }

  ngOnInit() {
    this.getSlides();
    // this.getNews();
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
    //领导阅评 等待接口中
    // this.http.getRequest('/specification_mon_evaluations').then((response:any) => {
    //   if(response && response.length > 0){
    //     for(let i=0;i<response.length;i++){
    //       if(response[i].ent_self_eva_mon_approvals.length > 0){
    //         for(let n=0;n<response[i].ent_self_eva_mon_approvals.length;n++){
    //           //子集团评价
    //           if(response[i].ent_self_eva_mon_approvals[n].mon_approval_type.code == '01'){
    //             this.slides[1].subGroup ++
    //           }
    //           //集团评价
    //           if(response[i].ent_self_eva_mon_approvals[n].mon_approval_type.code == '02'){
    //             this.slides[1].group ++
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
  }
  // 获取最新评价
  // getNews(){
  //   this.http.getRequest('/specification_mon_evaluations?sort=-evaluation_date').then((response:any) => {
  //     if(response && response.length > 0){
        // this.http.getRequest('/specification_evaluations/'+ response.id +'/sub_group_monitor').then((response:any) => {
        //   if(response && response.length > 0){
        //     this.noticeSlides = response;
        //   }
        // });
  //     }
  //   });
  // }
  // 获取公告通知数据
  getNotice(){
    this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
      if(response && response.length > 0){
        this.noticeSlides = response;
      }
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
  // 解决手动滑动后轮播图无法正常轮播
  touchEnd() {
    this.slide.startAutoplay();
  }
  // 请求数据完成后如果轮播图工作异常，调用该方法
  update() {
    this.slide.update();
  }
}
