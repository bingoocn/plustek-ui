import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-add-assess',
  templateUrl: './add-assess.component.html',
  styleUrls: ['./add-assess.component.scss'],
})
export class AddAssessComponent implements OnInit {

  public subordinatePlate: string;  // 所属板块
  public unitName: string;  // 单位名
  public evaluationDate: string;  // 选择日期
  public evaluationLevelCode: string; // 级次
  public title: string; // 编辑还是查看是新增
  public companyId: string; //企业自评ID

  constructor(public routeInfo: ActivatedRoute, private router: Router, public http: HttpService) { }

  ngOnInit() {
    // 获取登录人信息
    this.http.getUser().then((response: any) => {
      if (response && response.subordinateOrgName) {
        this.unitName = response.subordinateOrgName
      }
    })
    // 获取传递过来的规范评价id
    this.routeInfo.queryParams.subscribe((data) => {
      this.companyId = data.companyId,
        this.title = data.title
    });
    if (this.title === 'editor') {
      this.http.getRequest('/specification_evaluations/' + this.companyId).then((response: any) => {
        if (response) {
          this.evaluationLevelCode = response.evaluation_level.code;
          this.subordinatePlate = response.subordinate_plate;
          this.evaluationDate = response.evaluation_date;
        }
      });
    }
  }
  // 新增保存答题
  save() {
    // const params = {questionnaire_id: '', subordinate_plate: this.subordinatePlate, evaluation_date: this.evaluationDate, };
    // this.http.postRequest(`/specification_evaluations`, params).then((response: any) => {
    //   this.http.presentToast('保存成功！', 'bottom', 'success');
    // }, (error: any) => {
    // })
  }
  getQuestionnaire() {
    // this.http.getRequest(`/indicator_sets/${this.indicatorId}/indicators`, params).then((response: any) => {
    //   if (response && response.length > 0) {

    //   }
    // })

  }


  handleLastNameValue(event) {
    console.log(event);
  }
  processForm(event) { }



}
