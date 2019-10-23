import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-highlight',
  templateUrl: './show-highlight.page.html',
  styleUrls: ['./show-highlight.page.scss'],
})
export class ShowHighlightPage implements OnInit {

  public groupHighlights:any = [];
  public subGroupHighlights:any = [];
  highlightTabValue: string;

  constructor() { }

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
        level:'三级',
        grade:'80',
        person:'张平',
        time:'2019.9.10'
      }
    ]
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
