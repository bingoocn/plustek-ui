import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss'],
})
export class ModelDetailComponent implements OnInit {

  public levels:any = [];

  constructor() { }

  ngOnInit() {
    this.levels = [
      {
        label:'一级',
        value:'level01'
      },{
        label:'二级',
        value:'level02'
      },{
        label:'三级',
        value:'level03'
      },{
        label:'四级',
        value:'level04'
      },{
        label:'五级',
        value:'level05'
      }
    ]
  }

}
