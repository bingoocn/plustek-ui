import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-add-assess',
  templateUrl: './add-assess.component.html',
  styleUrls: ['./add-assess.component.scss'],
})
export class AddAssessComponent implements OnInit {

  public subordinatePlate: string;
  public evaluationDate: string;
  public evaluationLevelCode: string;

  constructor(public routeInfo: ActivatedRoute, private router: Router, public http: HttpService) { }

  ngOnInit() {
    // console.log(this.evaluationLevelCode,'日期',

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
  processForm(event) {}



}
