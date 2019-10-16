import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-improvement-plan',
  templateUrl: './improvement-plan.page.html',
  styleUrls: ['./improvement-plan.page.scss'],
})
export class ImprovementPlanPage implements OnInit {

  public plans:any = [];

  constructor(public router: Router) { }

  ngOnInit() {
    this.plans = [
      {
        guid:'01',
        title:'改善方案标题1',
        publishTime:'2019-10-13',
        unit:'北化集团人力部',
        publisher:'李鸿章'
      },{
        guid:'02',
        title:'改善方案标题2',
        publishTime:'2019-10-10',
        unit:'物资集团人力部',
        publisher:'曾国藩'
      },{
        guid:'02',
        title:'改善方案标题3',
        publishTime:'2019-10-09',
        unit:'兵科院人力部',
        publisher:'张作霖'
      }
    ];
  }
}
