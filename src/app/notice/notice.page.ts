import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {

  public notices:any = [];

  constructor(public router: Router) { 
    //this.router.navigate(['/viewNotice'], {
      //queryParams: {
       // object: JSON.stringify(object)
      //}
    //});
  }

  ngOnInit() {
    this.notices = [];
    for(let i=0; i<10; i++) {
      this.notices.push({
        guid: Math.round(Math.random()*10000),
        title: `201${i}年关于组织召开《精益管理信息化系统培训》的通知`,
        time: `201${i}年10月1日`
      })
    }
  }
  // 关键字搜索
  getNotices(ev: any) {
    this.ngOnInit();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.notices = this.notices.filter((item) => {
        return (item.title.indexOf(val) > -1);
      })
    }
  }
  //查看公告通知
  viewNotice(item: any) {
    if (item && item.title) {

    }
  }
}
