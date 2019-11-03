import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-leader-review-detail',
  templateUrl: './leader-review-detail.component.html',
  styleUrls: ['./leader-review-detail.component.scss'],
})
export class LeaderReviewDetailComponent implements OnInit {

  public reviewId:string; // 传过来的企业自评id
  public selfEvaluation:any;
  public group_leader_review_content:string = '';//集团领导点评
  public group_layout_task:string = '';//集团领导布置任务
  public sub_group_leader_review_content:string = '';//子集团领导点评
  public sub_group_layout_task:string = '';//子集团领导布置任务
  public is_group_role:boolean = false;//集团领导角色
  public is_sub_group_role:boolean = false;//子集团领导角色
  public review:string = '';

  constructor(public routeInfo:ActivatedRoute,private router: Router, public nav:NavController, public http:HttpService) { 
    // 从session里获取当前登录人的当前角色信息
    const currentRole = JSON.parse(localStorage.getItem('currentRole'));
    if(currentRole && currentRole.guid){
      // 获取系统运行参数表查找与当前登录人当前角色id相匹配的信息
      const params = {param_name:currentRole.guid};
      this.http.getRequest('/sys_param',params).then((response:any) => {
        if(response && response.param_value){
          var role = JSON.parse(response.param_value);
          if(role.abbreviation){
            if(role.abbreviation === 'JTLD'){
              this.is_group_role = true;
              this.review ='/top_group_review';
            }
            if(role.abbreviation === 'ZJTLD'){
              this.is_sub_group_role = true;
              this.review ='/sub_group_review';
            }
          }
        }
      })
    }
  }

  ngOnInit() {
    // 获取传过来的企业自评id
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    if(this.reviewId){
      this.http.getRequest('/specification_evaluations/' + this.reviewId).then((response:any) => {
        if(response) {
          this.selfEvaluation = response;
        }
      })
      //集团点评
      this.http.getRequest('/specification_evaluations/' + this.reviewId + '/top_group_review').then((response:any)=>{
        if(response){
          if(response.leader_review_content){
            this.group_leader_review_content = response.leader_review_content;
          }
          if(response.layout_task){
            this.group_layout_task = response.layout_task;
          }
        }
      })
      //子集团点评
      this.http.getRequest('/specification_evaluations/' + this.reviewId + '/sub_group_review').then((response:any)=>{
        if(response){
          if(response.leader_review_content){
            this.sub_group_leader_review_content = response.leader_review_content;
          }
          if(response.layout_task){
            this.sub_group_layout_task = response.layout_task;
          }
        }
      })
    }
  }

  // 提交
  toSubmit(){
    if(this.review && this.review !== ''){
      const group_params = {leader_review_content:this.group_leader_review_content,layout_task:this.group_layout_task};
      this.http.postRequest('/specification_evaluations/' + this.reviewId + this.review,group_params).then((response:any) => {
        this.http.presentToast('保存成功！', 'bottom', 'success');
        this.ngOnInit();
      })
    }
  }

}
