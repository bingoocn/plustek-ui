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
      self: '5',
      department: '5',
      leader: '3'
    },
    {
      department: '5',
      leader: '3'
    },
    {
      department: '5',
      leader: '3'
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
    this.getNotice();
    this.getSelfAssess();
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
