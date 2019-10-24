import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overall-evaluation',
  templateUrl: './overall-evaluation.page.html',
  styleUrls: ['./overall-evaluation.page.scss'],
})
export class OverallEvaluationPage implements OnInit {
  public evaluationValue:any = [];
  constructor() { }

  ngOnInit() {
    this.evaluationValue = [
      {
        guid:'0',
        evaluation:'2019年规范评价',
        grade:100,
        rank:1
      },
      {
        guid:'1',
        evaluation:'2018年规范评价',
        grade:97,
        rank:2
      }
    ]
  }

}
