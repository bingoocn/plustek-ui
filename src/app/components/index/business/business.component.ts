import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  //当前登录人单位Id
  public unitId: string;
  // 规范评价进度配置
  public slideOpts:any = {
    effect: 'flip', 
    speed: 400, 
    spaceBetween: 100,
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
  //   id:'01',
  //   notice:'该单位精益管理工作良好，继续努力',
  //   date:'2019-09-10'
  // };
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
      subGroup: 0,
      group: 0
    }
  ];
  // 自评结果数据
  public selfEvaluations = {
    id:'',
    level: '暂无',
    score: '暂无',
    time: '暂无'
  }

  @ViewChild("slide", { static: false }) slide;
  
  constructor( public http:HttpService) { }

  ngOnInit() {
    this.unitId = window.localStorage.getItem("unitId");
    this.getSlides();
    this.getSelfEvaluations();
    // this.getNews();
    this.getNotice();
  }
  getSlides() {
    //规范评价
    this.http.getRequest('/specification_evaluations?designated_apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        this.slides[0].self = response.length;
      }
    });
    this.http.getRequest('/specification_evaluations?evaluation_status_code=03,05&designated_apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        this.slides[0].department = response.length;
      }
    })
    this.http.getRequest('/specification_evaluations?evaluation_status_code=05&designated_apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        this.slides[0].leader = response.length;
        //获取自评结果统计
        this.selfEvaluations.id = response[0].id;
        this.selfEvaluations.level = response[0].evaluation_level.name;
        this.selfEvaluations.score = response[0].self_score;
        this.selfEvaluations.time = response[0].evaluation_date;
      }
    })
    //监控评价
    this.http.getRequest('/specification_mon_evaluations?evaluation_status_code=05&apply_id='+ this.unitId).then((response:any) => {
      if(response){
        response.forEach(element => {
          this.http.getRequest('/specification_evaluations/' + element.id + '/top_group_monitor').then((response:any) => {
            if(response !== null){
              this.slides[1].group ++
            }
          })
          this.http.getRequest('/specification_evaluations/' + element.id + '/sub_group_monitor').then((response:any) => {
            if(response !== null){
              this.slides[1].subGroup ++
            }
          })
        })
      }
    })
    //领导阅评
    this.http.getRequest('/specification_mon_evaluations?evaluation_status_code=05&leader_review_type_code=01&apply_id='+ this.unitId).then((response:any) => {
      this.slides[2].group = response.length;
    });
    this.http.getRequest('/specification_mon_evaluations?evaluation_status_code=05&leader_review_type_code=02&apply_id='+ this.unitId).then((response:any) => {
        this.slides[2].subGroup = response.length;
    });
  }
  getSelfEvaluations(){
    this.http.getRequest('/specification_evaluations?evaluation_status_code=02&sort=-create_time&designated_apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        this.slides[0].leader = response.length;
        //获取自评结果统计
        this.selfEvaluations.id = response[0].id;
        this.selfEvaluations.level = response[0].evaluation_level.name;
        this.selfEvaluations.score = response[0].self_score;
        this.selfEvaluations.time = response[0].evaluation_date;
      }
    })
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
  // 解决手动滑动后轮播图无法正常轮播
  touchEnd() {
    this.slide.startAutoplay();
  }
  // 请求数据完成后如果轮播图工作异常，调用该方法
  update() {
    this.slide.update();
  }
}
