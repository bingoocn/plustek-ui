import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss'],
})
export class PlanDetailComponent implements OnInit {

  planTabValue: string;

  constructor() { }

  ngOnInit() {
    this.planTabValue = 'improveContent';
  }

  // tab切换事件
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
