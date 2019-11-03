import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.scss'],
})
export class MyreviewComponent implements OnInit {

  public evaluations: any = [];
  public person_id:string = '';

  constructor(public http:HttpService) { }

  ngOnInit() {
    // 获取当前登录人信息
    this.http.getUser().then((response:any) => {
      if(response){
        if(response.guid){
          this.person_id = response.guid;
          const params = { sort:'-evaluation_date',appraiser_id:this.person_id };
          this.getData(params);
        }
      }
    })
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/specification_evaluations',params).then((response:any) => {
      if(response && response.length > 0){
        this.evaluations = response;
      }
    })
  }
}
