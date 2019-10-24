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

  constructor(public router: Router, public http:HttpService) { }

  ngOnInit() {
    const params = { title:'',publish_status_code: '02' };
    this.getData(params);
  }
  
  // 关键字搜索
  getNotices(ev: any) {
    const params = { title:ev.target.value,publish_status_code: '02' };
    this.getData(params);
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/notices', params).then((response:any) => {
      if(response && response.length > 0){
        this.notices = response;
      }
    });
  }
}
