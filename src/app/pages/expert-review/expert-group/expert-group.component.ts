import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-expert-group',
  templateUrl: './expert-group.component.html',
  styleUrls: ['./expert-group.component.scss'],
})
export class ExpertGroupComponent implements OnInit {

  public reviewId:string;
  public experts: any = [];

  constructor(public routeInfo:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    this.experts = [
      {
        unitName:'单位名称1',
        expertName:'张无忌',
        group:'小组一',
        role:'组长',
        type:'系统内'
      },{
        unitName:'单位名称2',
        expertName:'赵敏',
        group:'小组一',
        role:'组员',
        type:'系统内'
      },{
        unitName:'单位名称3',
        expertName:'周芷若',
        group:'小组一',
        role:'组员',
        type:'系统内'
      }
    ]
  }

}
