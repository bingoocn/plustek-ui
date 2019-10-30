import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-show-highlight',
  templateUrl: './show-highlight.page.html',
  styleUrls: ['./show-highlight.page.scss'],
})
export class ShowHighlightPage implements OnInit {

  public groupHighlights:any = [];
  public subGroupHighlights:any = [];
  highlightTabValue: string;

  constructor(public routeInfo:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.highlightTabValue = 'group';
    this.groupHighlights = [
      {
        guid:'01',
        group:'',
        unit:'',
        level:'三级',
        grade:'80',
        person:'张平',
        time:'2019.9.10'
      },{
        guid:'02',
        group:'',
        level:'一级',
        grade:'90',
        time:'2019.11.20'
      },{
        guid:'02',
        group:'',
        level:'四级',
        grade:'92',
        time:'2019.9.20'
      }
    ];
    this.subGroupHighlights = [
      {
        guid:'01',
        group:'',
        unit:'',
        level:'二级',
        grade:'88',
        person:'周宽',
        time:'2019.11.10'
      }
    ]
    this.getHighlightTabValue();
    // this.routeInfo.params.subscribe((params: Params) => this.highlightTabValue = params['highlightTabValue']);
  }
  getHighlightTabValue() {
    console.log(this.routeInfo.params.subscribe)
  }
  // tab切换事件
  tabChanged(ev: any) {
    console.log('Tab changed', ev);
  }

  // 关键字搜索
  getHighlights(ev:any){
    this.ngOnInit();

    const val = ev.target.value;
    if (val && val.trim() != ''){
      this.groupHighlights = this.groupHighlights.filter((item)=> {
        return (item.level.indexOf(val) > -1)
      })
    }
  }
}
