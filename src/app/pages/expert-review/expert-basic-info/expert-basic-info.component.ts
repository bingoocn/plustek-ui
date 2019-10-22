import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-expert-basic-info',
  templateUrl: './expert-basic-info.component.html',
  styleUrls: ['./expert-basic-info.component.scss'],
})
export class ExpertBasicInfoComponent implements OnInit {

  public reviewId:string;
  public expertReview:any = {};

  constructor(public routeInfo:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    this.expertReview = {
      subGroup:'北化集团',
      unitName:'245厂',
      plate:'板块一',
      selfEvaluationLevel:'五级',
      selfEvaluationScore:9,
      checkStartDate:'2019-08-23',
      checkEndDate:'2019-09-23',
      levelResult:'五级',
      pointScore:6,
      plusScore:0,
      checkScore:10,
      spotCheckCompliance:'100%',
      ratingReport:'评级报告1'
    }
  }

}
