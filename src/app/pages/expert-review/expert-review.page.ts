import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expert-review',
  templateUrl: './expert-review.page.html',
  styleUrls: ['./expert-review.page.scss'],
})
export class ExpertReviewPage implements OnInit {

  public expertEvaluations:any = [];

  constructor() { }

  ngOnInit() {
    this.expertEvaluations = [
      {
        guid:'01',
        subGroup:'北化集团',
        unitName:'245厂',
        plate:'板块一',
        levelResult:'五级',
        checkScore:10,
        checkStartDate:'2019-08-23'
      },{
        guid:'02',
        subGroup:'北方工业',
        unitName:'振华石油',
        plate:'板块二',
        levelResult:'三级',
        checkScore:5,
        checkStartDate:'2019-08-10'
      },{
        guid:'03',
        subGroup:'光电集团',
        unitName:'西安应用光学',
        plate:'板块四',
        levelResult:'二级',
        checkScore:13,
        checkStartDate:'2019-07-30'
      }
    ];
  }

  // 关键字搜索
  getExpertEvaluations(ev: any) {
    this.ngOnInit();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.expertEvaluations = this.expertEvaluations.filter((item:any) => {
        return (item.subGroup.indexOf(val) > -1);
      })
    }
  }

}
