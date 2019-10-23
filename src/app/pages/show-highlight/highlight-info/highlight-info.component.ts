import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlight-info',
  templateUrl: './highlight-info.component.html',
  styleUrls: ['./highlight-info.component.scss'],
})
export class HighlightInfoComponent implements OnInit {
  public highlightInfo:any = {};

  constructor() { }

  ngOnInit() {
    this.highlightInfo = {
        subGroup:'北化集团',
        unitName:'245厂',
        selfEvaluationLevel:'五级',
        selfEvaluationScore:89,
        person:'章可',
        pointScore:'2019-09-10',
        plusScore:'这是主要亮点信息这是主要亮点信息这是主要亮点信息这是主要亮点信息这是主要亮点信息这是主要亮点信息这是主要亮点信息这是主要亮点信息'
      }
  }

}
