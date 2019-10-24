import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-improvement-plan',
  templateUrl: './improvement-plan.page.html',
  styleUrls: ['./improvement-plan.page.scss'],
})
export class ImprovementPlanPage implements OnInit {

  public improvements:any = [];

  constructor(public router: Router, public http:HttpService) { }

  ngOnInit() {
    const params = { title:'',publish_status_code: '02' };
    this.getData(params);
  }

  // 关键字搜索
  getImprovements(ev: any) {
    const params = { title:ev.target.value,publish_status_code: '02' };
    this.getData(params);
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/improvements', params).then((response:any) => {
      if(response && response.length > 0){
        this.improvements = response;
      }
    });
  }
}
