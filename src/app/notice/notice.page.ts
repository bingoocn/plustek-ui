import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {

  public notices:any = [];
  // public publish_status_code:string;

  constructor(public router: Router,public http:HttpService) { 
    //this.router.navigate(['/viewNotice'], {
      //queryParams: {
       // object: JSON.stringify(object)
      //}
    //});
  }

  ngOnInit() {
    this.notices = [];
    const params = { title:'',publish_status_code: '' };
    this.http.getRequest('/notices', params).then((response:any) => {
      console.log(response,"返回的数据");
      this.notices = response;
    })
  }
  // 关键字搜索
  getNotices(ev: any) {
    this.ngOnInit();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.notices = this.notices.filter((item:any) => {
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
