import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss'],
})
export class PlanDetailComponent implements OnInit {

  public planId:string;
  public improvement:any;
  public planTabValue: string;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.planId = params['planId']);
    if(this.planId){
      this.http.getRequest('/improvements/' + this.planId).then((response:any) => {
        if(response) {
          this.improvement = response;
        }
      })
    }
    this.planTabValue = 'improveContent';
  }

  // tab切换事件
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
