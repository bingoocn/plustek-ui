import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss'],
})
export class QuestionsPageComponent implements OnInit {

  public indexes: any = [];
  public indicator_name: string;
  public indicator_id: string; //
  public evaluationLevelCode: string; // 试卷层级
  public evaluationDate: string; // 评价日期
  public indicatorId: string;
  public questId: string; //问卷的ID
  public subordinatePlate: string; // 所属板块

  constructor(public routeInfo: ActivatedRoute, public http: HttpService, private router: Router, public common: CommonService, ) { }

  ngOnInit() {
    this.routeInfo.queryParams.subscribe((data) => {this.evaluationLevelCode = data.evaluationLevelCode; this.subordinatePlate = data.subordinatePlate;this.evaluationDate = data.evaluationDate;});
    const params = { index_type_code: '01', start_status_code: '01', evaluation_level_code: this.evaluationLevelCode};
    this.getIndicator(params);
  }

   // 获取正在启用的问卷
   getIndicator(params: any) {
     this.http.getRequest(`/questionnaires`, params).then((response: any)=>{
       this.questId = response[0].id;
       this.indicator_name = response[0].indicator_sets.index_name;
       this.saveForm(this.questId);  
       this.http.getRequest(`/questionnaires/${this.questId}/tree`).then((response: any) => {
        if (response[0].id) {
          this.indicatorId = response[0].id
          this.http.getRequest('/indicator_sets/' + response[0].id + '/indicators').then(( response: any) => {
            if (response && response.length > 0) {
              this.indexes = this.common.forma2Tree(response, 'pid', 'id');
            }
          })
        }
       })
     })
  }

  saveForm(questId: any) {
    const params = {questionnaire_id: questId, subordinate_plate: this.subordinatePlate, evaluation_level_code : this.evaluationLevelCode, evaluation_date: this.evaluationDate, };
    this.http.postRequest(`/specification_evaluations`, params).then((response: any) => {
      // this.http.presentToast('保存成功！', 'bottom', 'success');
    }, (error: any) => {
    })
    
  }

}
