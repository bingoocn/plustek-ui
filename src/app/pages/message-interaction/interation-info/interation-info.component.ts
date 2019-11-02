import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interation-info',
  templateUrl: './interation-info.component.html',
  styleUrls: ['./interation-info.component.scss'],
})
export class InterationInfoComponent implements OnInit {
  public interationInfo : any = {};

  constructor() { }

  ngOnInit() {
    this.interationInfo = {
      subGroup:'北化集团',
      unitName:'241厂',
      selfEvaluationLevel:'一级',
      selfEvaluationScore:89,
      person:'章可',
      time:'2019-09-20',
      content:'各单位抓紧完成企业自评工作，保证精益管理工作稳步进行'
    }
  }

}
