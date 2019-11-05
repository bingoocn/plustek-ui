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
  public is_sub_group_recommended:boolean = false; // 是否子集团推荐
  public is_group_recommended:boolean = false; // 是否集团推荐
  public sub_group_mon_approval_content:any; // 子集团留言
  public group_mon_approval_content:any; // 集团留言
  public mon_approval_content:any = '';// 留言
  public role_recommended:any;
  public role_monitor:any;


  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    // 获取传递过来的企业自评id以及当前企业自评是否已留言
    this.routeInfo.params.subscribe((params: Params) => this.evaluationId = params['evaluationId']);
    this.is_evaluated = this.routeInfo.snapshot.queryParams['isEvaluated'];
    if(this.evaluationId){
      // 查询监控评价基本详细信息
      this.http.getRequest('/specification_evaluations/' + this.evaluationId).then((response:any) => {
        if(response) {
          this.selfEvaluation = response;
          if(this.selfEvaluation.ent_self_eva_mon_approvals && this.selfEvaluation.ent_self_eva_mon_approvals.length > 0){
            this.selfEvaluation.ent_self_eva_mon_approvals.forEach(element => {
              if(element.mon_approval_type && element.mon_approval_type.code && element.mon_approval_type.code == '01'){
                if(element.is_recommended){
                  this.is_group_recommended = true;
                }
              }
              if(element.mon_approval_type && element.mon_approval_type.code && element.mon_approval_type.code == '02'){
                if(element.is_recommended){
                  this.is_sub_group_recommended = true;
                }
              }
            })
          }
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
        // 查询集团留言，如果存在，显示集团留言
        this.http.getRequest('/specification_evaluations/' + this.evaluationId + '/top_group_monitor').then((response:any) => {
          if(response && response.mon_approval_content) {
            this.is_group_evaluated = true;
            this.group_mon_approval_content = response.mon_approval_content;
          }
        });
      }
    }
  }

  // 亮点推荐
  toRecommend(){
    // 从session里获取当前登录人的当前角色信息
    const currentRole = JSON.parse(localStorage.getItem('currentRole'));
    if(currentRole && currentRole.guid){
      // 获取系统运行参数表查找与当前登录人当前角色id相匹配的信息
      const params = {param_name:currentRole.guid};
      this.http.getRequest('/sys_param',params).then((response:any) => {
        if(response && response.param_value){
          var paramValue = JSON.parse(response.param_value);
          if(paramValue.abbreviation){
            var recommended = '';
            if(paramValue.abbreviation === 'JTYWBM'){
              recommended = '/top_group_recommended';
            }
            if(paramValue.abbreviation === 'ZJTYWBM'){
              recommended = '/sub_group_recommended';
            }
            if(recommended !== ''){
              this.http.putRequest('/specification_evaluations/' + this.evaluationId + recommended,'').then((response:any) => {
                this.http.presentToast('推荐成功！', 'bottom', 'success');
                this.ngOnInit();
              })
            }
          }
        }
      })
    }
  }
  // 提交
  toSubmit(){
    // 从session里获取当前登录人的当前角色信息
    const currentRole = JSON.parse(localStorage.getItem('currentRole'));
    if(currentRole && currentRole.guid){
      // 获取系统运行参数表查找与当前登录人当前角色id相匹配的信息
      const params = {param_name:currentRole.guid};
      this.http.getRequest('/sys_param',params).then((response:any) => {
        if(response && response.param_value){
          var paramValue = JSON.parse(response.param_value);
          if(paramValue.abbreviation){
            var monitor = '';
            if(paramValue.abbreviation === 'JTYWBM'){
              monitor = '/top_group_monitor';
            }
            if(paramValue.abbreviation === 'ZJTYWBM'){
              monitor = '/sub_group_monitor';
            }
            if(monitor !== ''){
              if(!this.mon_approval_content && this.mon_approval_content === ''){
                this.http.presentToast('请输入留言！', 'bottom', 'warning');
              }else{
                const params = {mon_approval_content:this.mon_approval_content};
                this.http.postRequest('/specification_evaluations/' + this.evaluationId + monitor,params).then((response:any) => {
                  this.http.presentToast('保存成功！', 'bottom', 'success');
                  this.ngOnInit();
                  this.mon_approval_content = '';
                })
              }
            }
          }
        }
      })
    }
  }
}
