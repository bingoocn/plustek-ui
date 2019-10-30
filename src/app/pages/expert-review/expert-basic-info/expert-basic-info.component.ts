import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-expert-basic-info',
  templateUrl: './expert-basic-info.component.html',
  styleUrls: ['./expert-basic-info.component.scss'],
})
export class ExpertBasicInfoComponent implements OnInit {

  public reviewId:string;
  public expertReview:any;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    if(this.reviewId){
      // 查询监控评价基本详细信息和评价结果
      this.http.getRequest('/expert_reviews/' + this.reviewId).then((response:any) => {
        if(response) {
          this.expertReview = response;
        }
      });
    }
  }

}
