import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
})
export class TopicDetailComponent implements OnInit {

  public comments:any = [
    {
      imgSrc:'assets/headSculpture/scenery.png',
      commentator:'范冰冰',
      content:'国庆节快乐！祝福祖国70岁生日快乐！',
      time:'9-30 15:23'
    },{
      imgSrc:'assets/headSculpture/uncle.png',
      commentator:'谢霆锋',
      content:'祝大家国庆节快乐！祖国母亲生日快乐！',
      time:'9-30 15:25'
    },{
      imgSrc:'assets/headSculpture/monkey.png',
      commentator:'林更新',
      content:'国庆快乐！祝亲爱的祖国更加繁荣昌盛！',
      time:'9-30 15:30'
    },{
      imgSrc:'assets/headSculpture/boy.png',
      commentator:'王源',
      content:'祖国妈妈Happy Birthday！',
      time:'9-30 16:04'
    },{
      imgSrc:'assets/headSculpture/girl.png',
      commentator:'欧阳娜娜',
      content:'祖国妈妈Happy Birthday！+1',
      time:'9-30 16:05'
    }
  ];

  constructor() { }

  ngOnInit() {}

  // 评论
  comment(){

  }

}
