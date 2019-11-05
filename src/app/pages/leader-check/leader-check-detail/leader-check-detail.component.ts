import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

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
  public model_id:string;

  constructor(public routeInfo:ActivatedRoute, public router: Router, public http:HttpService) { }

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
    const params = { index_type_code:'01',publish_status_code:'02'};
    this.getIndicator(params);
  }

  // 查询所有的题目
  getIndicator(params:any){
    this.http.getRequest('/evaluation_models', params).then((response:any) => {
      if(response && response.length > 0){
        // 获取企业自评使用的评价模型id
        response.forEach(item => {
          if(item.evaluation_level && item.evaluation_level.name && item.evaluation_level.name === this.level_name){
            this.model_id = item.id;
            // this.http.getRequest('/questionnaries/' + model_id + '/tree').then((response:any) => {

            // })
          }
        })
        // this.indicator_id = response[0].id;
        // if(response[0].id){
        //   this.http.getRequest('/indicator_sets/' + response[0].id + '/indicators').then((response:any) => {
        //     if(response && response.length > 0){
        //       this.indexes = [];
        //       response.forEach(element => {
        //         if(element.index_level_type && element.index_level_type.code && element.index_level_type.code == '01'){
        //           this.indexes.push({id:element.id,index_name:element.index_name,index_num:element.index_num});
        //         }
        //       });
        //     }
        //   })
        // }
      }
    })
  }

}
