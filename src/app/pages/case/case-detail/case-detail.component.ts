import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss'],
})
export class CaseDetailComponent implements OnInit {

  caseTabValue: string;

  constructor() { }

  ngOnInit() {
    this.caseTabValue = 'caseContent';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
