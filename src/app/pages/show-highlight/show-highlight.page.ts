import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-show-highlight',
  templateUrl: './show-highlight.page.html',
  styleUrls: ['./show-highlight.page.scss'],
})
export class ShowHighlightPage implements OnInit {

  public groupHighlights:any = [];
  public subGroupHighlights:any = [];
  highlightTabValue: string;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.highlightTabValue = 'group';
    this.groupHighlights = [
      // {
      //   guid:'01',
      //   group:'',
      //   unit:'',
      //   level:'三级',
      //   grade:'80',
      //   person:'张平',
      //   time:'2019.9.10'
      // }
    ];
    this.subGroupHighlights = [
      // {
      //   guid:'01',
      //   group:'',
      //   unit:'',
      //   level:'二级',
      //   grade:'88',
      //   person:'周宽',
      //   time:'2019.11.10'
      // }
    ]
    this.getData();
    this.getHighlightTabValue();
    // this.routeInfo.params.subscribe((params: Params) => this.highlightTabValue = params['highlightTabValue']);
  }
  getData() {
    this.http.getRequest('/specification_mon_evaluations').then((response:any) => {
      if(response && response.length > 0){
        console.log(response)
        for(let i=0;i<response.length;i++){
          if(response[i].ent_self_eva_mon_approvals.length > 0){
            for(let n=0;n<response[i].ent_self_eva_mon_approvals.length;n++){
              //子集团评价
              if(response[i].ent_self_eva_mon_approvals[n].mon_approval_type.code == '01'){
              
              }
              //集团评价
              if(response[i].ent_self_eva_mon_approvals[n].mon_approval_type.code == '02'){
              
              }
            }
          }
        }
      }
    });
  }
  getHighlightTabValue() {
    // console.log(this.routeInfo.params.subscribe)
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
