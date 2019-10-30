import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-reach-standard-evaluation',
  templateUrl: './reach-standard-evaluation.component.html',
  styleUrls: ['./reach-standard-evaluation.component.scss'],
})
export class ReachStandardEvaluationComponent implements OnInit {

  public reviewId:string;
  public points: any = [];

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    if(this.reviewId){
      this.http.getRequest('/expert_reviews/' + this.reviewId).then((response:any) => {
        if(response && response.expert_reach_standards && response.expert_reach_standards.length > 0) {
          this.points = response.expert_reach_standards;
        }
      });
    }
  }

}
