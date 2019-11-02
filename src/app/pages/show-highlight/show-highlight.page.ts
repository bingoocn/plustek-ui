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
    // 获取当前登录人信息
    this.http.getUser().then((response:any) => {
      console.log(response)
      if(response){
        if(response.guid){
          this.http.getRequest('/specification_evaluations_lightsopt?apply_fguid='+ response.subordinateOrgId +'&recommended_unit_type_code=02').then((response:any) => {
            if(response && response.length > 0){
              this.groupHighlights = response;
            }
          });
          this.http.getRequest('/specification_evaluations_lightsopt?apply_fguid='+ response.subordinateOrgId +'&recommended_unit_type_code=01').then((response:any) => {
            if(response && response.length > 0){
              this.subGroupHighlights = response;
            }
          });
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
