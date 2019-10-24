import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss'],
})
export class CaseDetailComponent implements OnInit {

  public caseId:string;
  public case:any;
  public caseTabValue: string;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.caseId = params['caseId']);
    if(this.caseId){
      this.http.getRequest('/cases/' + this.caseId).then((response:any) => {
        if(response) {
          this.case = response;
        }
      })
    }
    this.caseTabValue = 'caseContent';
  }

  // tab切换事件
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
