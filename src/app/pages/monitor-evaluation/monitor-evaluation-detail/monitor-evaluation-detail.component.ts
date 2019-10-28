import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-monitor-evaluation-detail',
  templateUrl: './monitor-evaluation-detail.component.html',
  styleUrls: ['./monitor-evaluation-detail.component.scss'],
})
export class MonitorEvaluationDetailComponent implements OnInit {

  public evaluationId:string;
  public selfEvaluation:any;
  public isHighlightRecommend:boolean = false;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.evaluationId = params['evaluationId']);
    this.isHighlightRecommend = this.routeInfo.snapshot.queryParams['isEvaluated'];
    if(this.evaluationId){
      this.http.getRequest('/specification_evaluations/' + this.evaluationId).then((response:any) => {
        if(response) {
          this.selfEvaluation = response; 
        }
      });
      if(this.isHighlightRecommend){
        this.http.getRequest('/specification_evaluations/' + this.evaluationId + '/sub_group_monitor').then((response:any) => {
          if(response && response.mon_approval_content) {
            
          }
        });
        this.http.getRequest('/specification_evaluations/' + this.evaluationId + '/top_group_monitor').then((response:any) => {
          if(response && response.mon_approval_content) {
            
          }
        });
      }
    }
  }

}
