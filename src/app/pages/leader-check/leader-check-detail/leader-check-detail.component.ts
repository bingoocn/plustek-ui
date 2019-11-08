import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-leader-check-detail',
  templateUrl: './leader-check-detail.component.html',
  styleUrls: ['./leader-check-detail.component.scss'],
})
export class LeaderCheckDetailComponent implements OnInit {

  public topics:any = []; // 题目
  public indicator_name:string; // 规范评价名称
  public indicator_id:string; // 规范评价id
  public assess_id:string; // 企业自评id 
  public is_checked:string; // 是否已审核
  public level_name:string; // 级别
  public level_code:string = ''; // 级别code
  public self_evaluations:any = [];
  public leader_review:string; // 审核人批阅
  public leader_check_info:any = []; // 领导审核信息
  public readonly:boolean = false;

  constructor(
    public routeInfo:ActivatedRoute,
    public router: Router,
    public http:HttpService,
    public common:CommonService,
    public nav: NavController) { }

  ngOnInit() {
    // 获取路由传递过来的企业自评id
    this.routeInfo.params.subscribe((params: Params) => this.assess_id = params['assessId']);
    this.is_checked = this.routeInfo.snapshot.queryParams['isChecked'];
    if (this.assess_id) {
      // 发送请求获取企业自评基本信息
      this.http.getRequest('/specification_evaluations/' + this.assess_id).then((response: any) => {
        // 获取规范评价名称
        if(response && response.questionnaire && response.questionnaire.indicator_sets && response.questionnaire.indicator_sets.index_name){
          this.indicator_name = response.questionnaire.indicator_sets.index_name;
        }
        // 获取试卷的级别
        if(response && response.questionnaire && response.questionnaire.evaluation_level && response.questionnaire.evaluation_level.name) {
          this.level_name = response.questionnaire.evaluation_level.name;
        }
        // 获取试卷的级别的code
        if(response && response.questionnaire && response.questionnaire.evaluation_level && response.questionnaire.evaluation_level.code) {
          this.level_code = response.questionnaire.evaluation_level.code;
          if(this.level_code && this.level_code != ''){
            const params = { index_type_code:'01',publish_status_code:'02',evaluation_level_code:this.level_code};
            this.getIndicator(params);
          }
        }
        // 获取试卷答案
        if(response && response.self_evaluations && response.self_evaluations.length > 0){
          this.self_evaluations = response.self_evaluations;
        }
      });
      // 发送请求获取企业自评分管领导审核信息
      this.http.getRequest('/specification_evaluations/' + this.assess_id + '/leader_check').then((response:any) => {
        if(response && response.approval_detail && response.approval_detail.length > 0){
          this.leader_check_info = response.approval_detail;
        }
        if(response && response.leader_review){
          this.leader_review = response.leader_review;
        }
      })
    }
  }

  // 查询所有的题目
  getIndicator(params:any){
    this.http.getRequest('/evaluation_models', params).then((response:any) => {
      if(response && response.length > 0){
        // 获取企业自评使用的评价模型id,并根据id查询所有题目
        if(response[0].id){
          this.http.getRequest('/questionnaires/' + response[0].id + '/tree').then((response:any) => {
            if(response && response.length > 0){
              response.forEach(item => {
                // 为所有的选项添加checked属性，默认值为false
                if(item.options && item.options.length > 0){
                  item.options.forEach(i => {
                    i['checked'] = false;
                  })
                }
                // 遍历试卷答案，回显答题
                if(this.self_evaluations.length > 0){
                  this.self_evaluations.forEach(e => {
                    if(e.index_slave_id && e.index_slave_id == item.id){
                      if(item.options && item.options.length > 0){
                        item.options.forEach(i => {
                          if(e.options && e.options.length > 0){
                            e.options.forEach(el => {
                              if(el.topics_slave_id && el.topics_slave_id == i.id){
                                i['checked'] = true;
                                if(i.topics_type && i.topics_type.code && i.topics_type.code == '02'){
                                  i.topics_content = el.supplementary_content;
                                }
                              }
                            })
                          }
                        })
                      }
                    }
                  })
                }
              })
              this.topics = this.common.forma2Tree(response, 'pid', 'id')[0].children;
              // 为维度添加属性approval_status_code，默认值为''
              if(this.topics.length > 0){
                this.topics.forEach(element => {
                  element['approval_status_code'] = "";
                })
              }
              // 遍历领导审核信息，回显
              if(this.leader_check_info.length > 0){
                this.leader_check_info.forEach(item => {
                  if(item.indicator_id){
                    if(this.topics.length > 0){
                      this.topics.forEach(element => {
                        if(element.id == item.indicator_id){
                          element['approval_status_code'] = item.approval_status_code;
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  }

  // 保存并上报
  saveAndReport(){
    var detail:any = [];
    if(this.topics.length > 0){
      this.topics.forEach(element => {
        if(element.approval_status_code){
          detail.push({
            indicator_id:element.id,
            approval_status_code:element.approval_status_code
          })
        }
      })
      if(detail.length > 0){
        const params = {
          leader_review:this.leader_review,
          detail:detail
        }
        this.http.postRequest('/specification_evaluations/' + this.assess_id + '/leader_check',params).then((response:any) => {
          if(response && response.id){
            this.http.putRequest('/specification_evaluations/' + this.assess_id + '/reported','').then((response:any) => {
              this.http.presentToast('保存并上报成功！', 'bottom', 'success');
              this.back();
            })
          }
        })
      }
    }
  }

  // 返回列表页
  back(){
    this.nav.navigateRoot(['/leader-check']).then(() => {
      location.reload();
    });
  }

}
