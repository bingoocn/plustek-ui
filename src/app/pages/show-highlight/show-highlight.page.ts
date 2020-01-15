import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-show-highlight',
  templateUrl: './show-highlight.page.html',
  styleUrls: ['./show-highlight.page.scss'],
})
export class ShowHighlightPage implements OnInit {
  //当前登录人单位Id
  public unitId: string;
  public groupHighlights:any = [];
  public subGroupHighlights:any = [];
  //默认tab
  public highlightTabValue: string;
  public groupArr:any = [];
  public subGroupArr:any = [];

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.unitId = window.localStorage.getItem("unitId");
    this.highlightTabValue = 'group';
    //路由跳转默认tab
    const group_state = this.routeInfo.snapshot.queryParams['group_state'];
    if(group_state){this.highlightTabValue = group_state}
    
    this.getData();
  }
  // 关键字搜索
  getCases(ev: any) {
    // this.page = 1;
    // this.title = ev.target.value;
    // const params = { title:this.title,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time' };
    // this.getData(params);
  }
  getData() {
    // 获取当前登录人信息
    this.http.getUser().then((response:any) => {
      if(response){
        if(response.guid){
          this.http.getRequest('/specification_evaluations_lightspot?apply_id='+ this.unitId +'&recommended_unit_type_code=01').then((response:any) => {
            if(response && response.length > 0){
              response.forEach( item=>{
                  this.groupArr.push({
                    subGroup:item.unit.group.name,
                    guid:item.id,
                    unit:item.recommended_person.unit_name,
                    level:item.evaluation_level.name,
                    grade:item.self_score,
                    person:item.recommended_person.name,
                    time:item.recommended_date,
                  })
              })
              this.groupHighlights = this.groupArr;
            }
          });
        }
        this.http.getRequest('/specification_evaluations_lightspot?apply_id='+ this.unitId +'&recommended_unit_type_code=02').then((response:any) => {
          if(response && response.length > 0){
            response.forEach( item=>{
                this.subGroupArr.push({
                  subGroup:item.unit.group.name,
                  guid:item.id,
                  unit:item.recommended_person.unit_name,
                  level:item.evaluation_level.name,
                  grade:item.self_score,
                  person:item.recommended_person.name,
                  time:item.recommended_date,
                })
            })
            this.subGroupHighlights = this.subGroupArr;
          }
        });
      }
    });
  }
  // tab切换事件
  tabChanged(ev: any) {

  }

  // 关键字搜索
  // getHighlights(ev:any){
  //   this.ngOnInit();

  //   const val = ev.target.value;
  //   if (val && val.trim() != ''){
  //     this.groupHighlights = this.groupHighlights.filter((item)=> {
  //       return (item.level.indexOf(val) > -1)
  //     })
  //   }
  // }
}
