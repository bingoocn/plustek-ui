import { Component, OnInit } from '@angular/core';
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

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

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
    const group_params = {leader_review_content:this.group_leader_review_content,layout_task:this.group_layout_task};
    this.http.postRequest('/specification_evaluations/' + this.reviewId + '/top_group_review',group_params).then((response:any) => {
      this.http.presentToast('保存成功！', 'bottom', 'success');
      this.ngOnInit();
    })

    const sub_group_params = {leader_review_content:this.sub_group_leader_review_content,layout_task:this.sub_group_layout_task};
    this.http.postRequest('/specification_evaluations/' + this.reviewId + '/sub_group_review',sub_group_params).then((response:any) => {
      this.http.presentToast('保存成功！', 'bottom', 'success');
      this.ngOnInit();
    })
  }

}
