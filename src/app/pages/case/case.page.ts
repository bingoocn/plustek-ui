import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {

  public cases:any = [];

  constructor(public router: Router, public http:HttpService) { }

  ngOnInit() {
    const params = { title:'',publish_status_code: '02' };
    this.getData(params);
  }

  // 关键字搜索
  getCases(ev: any) {
    const params = { title:ev.target.value,publish_status_code: '02' };
    this.getData(params);
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/cases', params).then((response:any) => {
      if(response && response.length > 0){
        this.cases = response;
      }
    });
  }

}
