import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-leader-review-detail',
  templateUrl: './leader-review-detail.component.html',
  styleUrls: ['./leader-review-detail.component.scss'],
})
export class LeaderReviewDetailComponent implements OnInit {

  public reviewId:string;
  public selfEvaluation:any;
  public gorupEvaluation:any;
  public subGorupEvaluation:any;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    if(this.reviewId){
      this.http.getRequest('/specification_evaluations/' + this.reviewId).then((response:any) => {
        if(response) {
          this.selfEvaluation = response;
        }
      })
      //集团点评
      this.http.getRequest('/specification_evaluations/' + this.reviewId + '/top_group_review').then((response:any)=>{
        if(response){
          this.gorupEvaluation = response;
        }
      })
      //子集团点评
      this.http.getRequest('/specification_evaluations/' + this.reviewId + '/sub_group_review').then((response:any)=>{
        if(response){
          this.subGorupEvaluation = response;
        }
      })
    }
  }

}
