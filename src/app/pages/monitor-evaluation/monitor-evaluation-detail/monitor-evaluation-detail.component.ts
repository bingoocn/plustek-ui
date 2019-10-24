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
    if(this.evaluationId){
      this.http.getRequest('/specification_evaluations/' + this.evaluationId).then((response:any) => {
        if(response) {
          this.selfEvaluation = response;
        }
      })
    }
  }

}
