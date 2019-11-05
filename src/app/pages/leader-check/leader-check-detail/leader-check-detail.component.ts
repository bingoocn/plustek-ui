import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

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
  public level_name:string; // 级别
  // public model_id:string;

  constructor(public routeInfo:ActivatedRoute, public router: Router, public http:HttpService,public common:CommonService) { }

  ngOnInit() {
    // 获取路由传递过来的维度id
    this.routeInfo.params.subscribe((params: Params) => this.assess_id = params['assessId']);
    if (this.assess_id) {
      // 查询规范评价名称及企业自评的级别
      this.http.getRequest('/specification_evaluations/' + this.assess_id).then((response: any) => {
        if(response && response.questionnaire && response.questionnaire.indicator_sets && response.questionnaire.indicator_sets.index_name){
          this.indicator_name = response.questionnaire.indicator_sets.index_name;
        }
        if (response && response.questionnaire && response.questionnaire.evaluation_level && response.questionnaire.evaluation_level.name) {
          this.level_name = response.questionnaire.evaluation_level.name;
        }
      });
    }
    const params = { index_type_code:'01',publish_status_code:'02',evaluation_level_code:'01'};
    this.getIndicator(params);
  }

  // 查询所有的题目
  getIndicator(params:any){
    this.http.getRequest('/evaluation_models', params).then((response:any) => {
      if(response && response.length > 0){
        // 获取企业自评使用的评价模型id,并根据id查询所有题目
        if(response[0].id){
          this.http.getRequest('/questionnaires/' + response[0].id + '/tree').then((response:any) => {
            if(response && response.length > 0){
              this.topics = this.common.forma2Tree(response, 'pid', 'id')[0].children;
            }
          })
        }
      }
    })
  }

}
