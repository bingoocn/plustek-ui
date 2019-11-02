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
  public indicator_id: string;
  public evaluationLevelCode: string;
  public evaluationDate: string;
  // public evaluationLevelCode: string;

  constructor(public routeInfo: ActivatedRoute, public http: HttpService, private router: Router, public common: CommonService, ) { }

  ngOnInit() {
    // 获取传递过来的规范评价id
    this.routeInfo.queryParams.subscribe((data) => {this.evaluationLevelCode = data.evaluationLevelCode;this.evaluationDate = data.evaluationDate;});
    const params = { index_type_code: '01', start_status_code: '01', evaluation_level_code: this.evaluationLevelCode};
    this.getIndicator(params);
  }

   // 获取当前使用的《规范》评价指标及其下的第一层维度
   getIndicator(params: any) {
    this.http.getRequest('/indicator_sets', params).then((response: any) => {
      if (response && response.length > 0) {
        this.indicator_id = response[0].id;
        if (response[0].index_name) {
          if (response[0].year) {
            this.indicator_name = response[0].index_name;
          } else {
            this.indicator_name = response[0].index_name;
          }
        }
        if (response[0].id) {
          this.http.getRequest('/indicator_sets/' + response[0].id + '/indicators').then(( response: any) => {
            if (response && response.length > 0) {
              // this.indexes = this.common.forma2Tree(response, 'pid', 'id');
            }
          })
        }
      }
    })
  }

}
