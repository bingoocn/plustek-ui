import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-info',
  templateUrl: './evaluation-info.component.html',
  styleUrls: ['./evaluation-info.component.scss'],
})
export class EvaluationInfoComponent implements OnInit {
  public evaluationValue:any = {};
  constructor() { }

  ngOnInit() {
    this.evaluationValue = {
      subGroup:'北化集团',
      unitName:'245厂',
      plate:'板块一',
      selfEvaluationLevel:'五级',
      selfEvaluationScore:9,
      checkStartDate:'2019-08-23',
      checkEndDate:'2019-09-23',
      pointScore:6,
    }
  }

}
