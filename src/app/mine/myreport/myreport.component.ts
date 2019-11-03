import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-myreport',
  templateUrl: './myreport.component.html',
  styleUrls: ['./myreport.component.scss'],
})
export class MyreportComponent implements OnInit {

  public reports:any = [];
  public person_id:string = '';

  constructor(public route:ActivatedRoute, public http:HttpService) { }

  ngOnInit() {
    // 获取当前登录人信息
    this.http.getUser().then((response:any) => {
      if(response){
        if(response.guid){
          this.person_id = response.guid;
          const params = { fill_person_id:this.person_id };
          this.getData(params);
        }
      }
    })
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/specification_self_evaluations', params).then((response:any) => {
      if(response && response.length > 0){
        this.reports = response;
      }
    });
  }

}
