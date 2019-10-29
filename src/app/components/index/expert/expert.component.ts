import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
})
export class ExpertComponent implements OnInit {
  public noticeOpts : any = {
    effect: 'flip', 
    speed: 400, 
    loop:true, 
    autoplay: { delay: 2000 }, 
    direction:'vertical'
  }
  public slides = [
    {
      id:'8ae4af936df2617b016df2ce68f10008',
      notice:'最近频频被点名的“区块链”,到底是个啥?|区块链_新浪军事_新浪网',
      date:'2019-09-10'
    },
    {
      id:'8ae4af936df2617b016df2ce68f10008',
      notice: '第七届世界军人运动会闭幕式侧记',
      date: '2019-10-11'
    },
    {
      id:'8ae4af936df2617b016df2ce68f10008',
      notice: '红杉创始人Don Valentine逝世,沈南鹏悼念硅谷传奇',
      date: '2019-11-21'
    }
  ];
  public selfAccess :any = {
    accessedNum:'39',
    heighLevel:'二级',
    lowLevel:'四级',
    heighsum:'20',
    lowsum:'12'
  };
  public selfCheck :any = {
    checkedNum:'35',
    heighLevel:'三级',
    lowLevel:'五级',
    heighsum:'30',
    lowsum:'23'
  };
 
  constructor() { }

  ngOnInit() {}

}
