import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-interation-info',
  templateUrl: './interation-info.component.html',
  styleUrls: ['./interation-info.component.scss'],
})
export class InterationInfoComponent implements OnInit {
  public interationInfo : any = {};
  public interationId : string;

  constructor( public routeInfo:ActivatedRoute,private router: Router,public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.interationId = params['interationId']);
    this.interationInfo = {
      subGroup:'',
      unitName:'',
      selfEvaluationLevel:'',
      selfEvaluationScore:'',
      person:'',
      time:'',
      content:''
    }
    this.getData();
  }
  // 发送请求获取数据
  getData(){
    this.http.getRequest('/specification_evaluations/'+ this.interationId,).then((response:any) => {
      if(response){
        
      }
    });
  }
}
