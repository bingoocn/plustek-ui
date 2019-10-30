import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-evaluation-info',
  templateUrl: './evaluation-info.component.html',
  styleUrls: ['./evaluation-info.component.scss'],
})
export class EvaluationInfoComponent implements OnInit {
  public evaluationValue:any = {};
  public evaluationId : string;
  public viewPage : boolean = true;
  
  constructor(public routeInfo:ActivatedRoute,private router: Router,public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.evaluationId = params['evaluationId']);
    this.getData();
  }
  // 发送请求获取数据
  getData(){
    this.http.getRequest('/evaluation_results/' + this.evaluationId).then((response:any) => {
      if(response){
        this.evaluationValue = response;
      }
    });
  }
  toEdit() {
    this.viewPage = false;
  }
  toView() {
    this.viewPage = true;
  }
  toSave() {

  }
}
