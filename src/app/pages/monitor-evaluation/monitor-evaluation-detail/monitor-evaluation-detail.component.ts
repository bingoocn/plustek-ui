import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-monitor-evaluation-detail',
  templateUrl: './monitor-evaluation-detail.component.html',
  styleUrls: ['./monitor-evaluation-detail.component.scss'],
})
export class MonitorEvaluationDetailComponent implements OnInit {

  public evaluationId:string;
  public selfEvaluation:any;
  public is_evaluated:boolean = false; // 是否留言
  public is_sub_group_evaluated:boolean = false; // 是否子集团留言
  public is_group_evaluated:boolean = false; // 是否集团留言
  public sub_group_mon_approval_content:any; // 子集团留言
  public group_mon_approval_content:any; // 集团留言
  public mon_approval_content:any = '';// 留言


  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.evaluationId = params['evaluationId']);
    this.is_evaluated = this.routeInfo.snapshot.queryParams['isEvaluated'];
    if(this.evaluationId){
      // 查询监控评价基本详细信息
      this.http.getRequest('/specification_evaluations/' + this.evaluationId).then((response:any) => {
        if(response) {
          this.selfEvaluation = response;
        }
      });
      // 判断是否留言，如果已留言，查询留言信息并显示
      if(this.is_evaluated){
        // 查询子集团留言，如果存在，显示子集团留言
        this.http.getRequest('/specification_evaluations/' + this.evaluationId + '/sub_group_monitor').then((response:any) => {
          if(response && response.mon_approval_content) {
            this.is_sub_group_evaluated = true;
            this.sub_group_mon_approval_content = response.mon_approval_content;
          }
        });
        this.http.getRequest('/specification_evaluations/' + this.evaluationId + '/top_group_monitor').then((response:any) => {
          if(response && response.mon_approval_content) {
            this.is_group_evaluated = true;
            this.group_mon_approval_content = response.mon_approval_content;
          }
        });
      }
    }
  }

  // 获取当前登录人信息
  getUser(){
    this.http.getRequest('/user').then((response => {
      
    }))
  }
  // 亮点推荐-集团
  toRecommend(){
    this.http.putRequest('/specification_evaluations/' + this.evaluationId + '/top_group_recommended' ,'').then((response:any) => {
      this.http.presentToast('推荐成功！', 'bottom', 'success');
      this.ngOnInit();
    })
  }
  // 提交-集团
  toSubmit(){
    const params = {mon_approval_content:this.mon_approval_content};
    this.http.postRequest('/specification_evaluations/' + this.evaluationId + '/top_group_monitor',params).then((response:any) => {
      this.http.presentToast('保存成功！', 'bottom', 'success');
      this.ngOnInit();
      this.mon_approval_content = '';
    })
  }
}
