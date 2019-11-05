import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-self-assessment-detail',
  templateUrl: './self-assessment-detail.component.html',
  styleUrls: ['./self-assessment-detail.component.scss'],
})
export class SelfAssessmentDetailComponent implements OnInit {

  public assessId: string; // 企业自评id
  public assessInfo: any; // 企业自评基本信息
  public is_checked:boolean; // 分管领导是否已审核
  public dept_check_info:any; // 部门审核信息
  public leader_check_info:any; // 分管领导审核信息

  constructor(public routeInfo: ActivatedRoute, private router: Router, public http: HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.assessId = params['assessId']);
    this.is_checked = this.routeInfo.snapshot.queryParams['isChecked'];
    if (this.assessId) {
      // 查询企业自评基本信息
      this.http.getRequest('/specification_evaluations/' + this.assessId).then((response: any) => {
        if (response) {
          this.assessInfo = response;
        }
      });
      // 查询企业自评部门审核信息
      this.http.getRequest('/specification_evaluations/' + this.assessId + '/department_check').then((response:any) => {
        if(response){
          this.dept_check_info = response;
        }
      })
      // 查询企业自评分管领导审核信息
      this.http.getRequest('/specification_evaluations/' + this.assessId + '/leader_check').then((response:any) => {
        if(response){
          this.leader_check_info = response;
        }
      })
    }
  }

}
