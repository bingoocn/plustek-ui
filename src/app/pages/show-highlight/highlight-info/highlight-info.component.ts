import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-highlight-info',
  templateUrl: './highlight-info.component.html',
  styleUrls: ['./highlight-info.component.scss'],
})
export class HighlightInfoComponent implements OnInit {
  public highlightInfo:any = {};
  public hightLightId : string;
  public code : string;

  constructor(public routeInfo:ActivatedRoute,private router: Router,public http:HttpService) { }

  ngOnInit() {
    this.highlightInfo = {}
    this.routeInfo.queryParams.subscribe((data) => {this.hightLightId = data.hightLightId,this.code = data.code});
    this.getData();
  }
   // 发送请求获取数据
   getData(){
    this.http.getRequest('/specification_evaluations/' + this.hightLightId).then((response:any) => {
      if(response){
          response.ent_self_eva_mon_approvals.forEach( el=>{
            if(el.mon_approval_type.code == '01'){
              this.highlightInfo.push={
                unitName:el.data_unit.name,
                selfEvaluationLevel:response.evaluation_level.name,
                self_score:response.self_score,
                person:el.mon_approval_person,
                time:el.mon_approval_date,
                main_light:el.mon_approval_content
              }
            }
            if(el.mon_approval_type.code == '02'){
              this.highlightInfo = {
                unitName:el.data_unit.name,
                selfEvaluationLevel:response.evaluation_level.name,
                self_score:response.self_score,
                person:el.mon_approval_person,
                time:el.mon_approval_date,
                main_light:el.mon_approval_content
              }
            }
          })
      }
    });
  }
}
