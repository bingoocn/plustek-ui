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
  //默认tab
  public highlightTabValue: string;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.highlightTabValue = 'group';
    //路由跳转默认tab
    const group_state = this.routeInfo.snapshot.queryParams['group_state'];
    this.highlightTabValue = group_state;
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
          this.http.getRequest('/specification_evaluations_lightspot?apply_fguid=&recommended_unit_type_code=01').then((response:any) => {
            if(response && response.length > 0){
              let groupArr = [];
              let sunGroupArr = [];

              response.forEach( item=>{
                if(item.ent_self_eva_mon_approvals.length == 1){
                  if(item.ent_self_eva_mon_approvals[0].mon_approval_type.code == '01'){
                    groupArr.push({
                      subGroup:item.unit.group.name,
                      guid:item.id,
                      unit:item.ent_self_eva_mon_approvals[0].data_unit.name,
                      level:item.evaluation_level.name,
                      grade:item.self_score,
                      person:item.ent_self_eva_mon_approvals[0].mon_approval_person,
                      time:item.ent_self_eva_mon_approvals[0].mon_approval_date,
                    })
                  }
                  if(item.ent_self_eva_mon_approvals[0].mon_approval_type.code == '02'){
                    sunGroupArr.push({
                      subGroup:item.unit.group.name,
                      guid:item.id,
                      unit:item.ent_self_eva_mon_approvals[0].data_unit.name,
                      level:item.evaluation_level.name,
                      grade:item.self_score,
                      person:item.ent_self_eva_mon_approvals[0].mon_approval_person,
                      time:item.ent_self_eva_mon_approvals[0].mon_approval_date,
                    })
                  }
                }
                if(item.ent_self_eva_mon_approvals.length == 2){
                  item.ent_self_eva_mon_approvals.forEach( el=>{
                    if(el.mon_approval_type.code == '01'){
                      groupArr.push({
                        subGroup:item.unit.group.name,
                        guid:item.id,
                        unit:el.data_unit.name,
                        level:item.evaluation_level.name,
                        grade:item.self_score,
                        person:el.mon_approval_person,
                        time:el.mon_approval_date,
                      })
                    }
                  })
                  item.ent_self_eva_mon_approvals.forEach( el=>{
                    if(el.mon_approval_type.code == '02'){
                      sunGroupArr.push({
                        subGroup:item.unit.group.name,
                        guid:item.id,
                        unit:el.data_unit.name,
                        level:item.evaluation_level.name,
                        grade:item.self_score,
                        person:el.mon_approval_person,
                        time:el.mon_approval_date,
                      })
                    }
                  })
                }
              })
              this.groupHighlights = groupArr;
              this.subGroupHighlights = sunGroupArr;
            }
          });
          this.http.getRequest('/specification_evaluations_lightspot?apply_fguid='+ response.subordinateOrgId +'&recommended_unit_type_code=02').then((response:any) => {
            if(response && response.length > 0){
              this.subGroupHighlights = response;
            }
          });
        }
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
