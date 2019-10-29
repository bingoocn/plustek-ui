import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-expert-group',
  templateUrl: './expert-group.component.html',
  styleUrls: ['./expert-group.component.scss'],
})
export class ExpertGroupComponent implements OnInit {

  public reviewId:string;
  public experts: any = [];

  constructor(public routeInfo:ActivatedRoute,private router: Router,public http: HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    if(this.reviewId){
      this.http.getRequest('/expert_reviews/' + this.reviewId).then((response:any) => {
        if(response && response.expert_members && response.expert_members.length > 0) {
          this.experts = response.expert_members;
        }
      });
    }
  }

}
