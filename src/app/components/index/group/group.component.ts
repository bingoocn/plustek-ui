import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
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
  public GroupNotice = [];
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
    level: '四级',
    score: '80',
    time: '2019-10-28'
  }

  @ViewChild("slide", { static: false }) slide;

  constructor( public http:HttpService) { }

  ngOnInit() {
    this.getNotice();
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
