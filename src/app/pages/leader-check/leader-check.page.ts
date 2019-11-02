import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-leader-check',
  templateUrl: './leader-check.page.html',
  styleUrls: ['./leader-check.page.scss'],
})
export class LeaderCheckPage implements OnInit {

  public assess: any = [];
  constructor(public router: Router, public http: HttpService) { }


  ngOnInit() {
    this.getData();
  }

  // 发送请求获取数据
  getData() {
    this.http.getRequest('/specification_evaluations').then((response: any) => {
      if (response && response.length > 0) {
        this.assess = response;
      }
    });
  }

}
