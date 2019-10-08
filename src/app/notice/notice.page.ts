import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {

  public notices:any = [];

  constructor() { }

  ngOnInit() {
    for(let i=0; i<10; i++) {
      this.notices.push({
        guid: Math.round(Math.random()*10000),
        title: `201${i}年关于组织召开《精益管理信息化系统培训》的通知`,
        time: `201${i}年10月1日`
      })
    }
  }

}
