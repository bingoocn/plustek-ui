import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {

  public cases:any = [];

  constructor(public router: Router) { }

  ngOnInit() {
    this.cases = [
      {
        guid:'01',
        title:'案例分析标题1',
        publishTime:'2019-10-13',
        unit:'北化集团人力部',
        publisher:'李鸿章'
      },{
        guid:'02',
        title:'案例分析标题2',
        publishTime:'2019-10-10',
        unit:'物资集团人力部',
        publisher:'曾国藩'
      },{
        guid:'02',
        title:'案例分析标题3',
        publishTime:'2019-10-09',
        unit:'兵科院人力部',
        publisher:'张作霖'
      }
    ];
  }

}
