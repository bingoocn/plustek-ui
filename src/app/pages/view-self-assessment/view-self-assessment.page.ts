import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-view-self-assessment',
  templateUrl: './view-self-assessment.page.html',
  styleUrls: ['./view-self-assessment.page.scss'],
})
export class ViewSelfAssessmentPage implements OnInit {

  public assess: any = [];//分管领导已审核

  constructor(public router: Router, public http: HttpService) { }

  ngOnInit() {
    const checkedParams = { evaluation_status_code:'05',sort:'-evaluation_date' };
    this.getCheckedData(checkedParams);
  }

  // 发送请求获取分管领导已审核数据
  getCheckedData(params) {
    this.http.getRequest('/specification_evaluations',params).then((response: any) => {
      if (response && response.length > 0) {
        this.assess = response;
      }
    });
  }

}
