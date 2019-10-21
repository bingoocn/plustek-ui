import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myreport',
  templateUrl: './myreport.component.html',
  styleUrls: ['./myreport.component.scss'],
})
export class MyreportComponent implements OnInit {

  public reports:any = [];

  constructor() { }

  ngOnInit() {
    this.reports = [
      {
        guid:'01',
        level:'三级',
        score:'10',
        status:'已提交',
        time:'2019-10-21',
        process:'部门审核'
      },{
        guid:'02',
        level:'二级',
        score:'20',
        status:'已提交',
        time:'2019-10-10',
        process:'领导审核'
      },{
        guid:'02',
        level:'二级',
        score:'20',
        status:'已提交',
        time:'2019-10-09',
        process:'领导已审核'
      }
    ];
  }

}
