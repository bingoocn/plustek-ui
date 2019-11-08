import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-department-check',
  templateUrl: './department-check.page.html',
  styleUrls: ['./department-check.page.scss'],
})
export class DepartmentCheckPage implements OnInit {

  public checkTabValue: string; // 当前tab值
  public unit_id: string = ''; // 当前登录人所属组织机构id
  public unAssess: any = []; // 待审核
  public assess: any = []; // 已审核

  constructor(public router: Router, public http: HttpService) { }

  ngOnInit() {
    this.checkTabValue = 'unchecked'; // 默认显示待审核的
    // 获取当前登录人所属单位信息
    this.http.getUser().then((response: any) => {
      if (response && response.subordinateOrgId) {
        this.unit_id = response.subordinateOrgId;
        const uncheckedParams = { evaluation_status_code: '02', sort: '-evaluation_date', apply_id: this.unit_id };
        this.getUnCheckedData(uncheckedParams);
        const checkedParams = { evaluation_status_code: '03,04,05,06', sort: '-evaluation_date', apply_id: this.unit_id };
        this.getCheckedData(checkedParams);
      }
    })
  }
  // 发送请求获取待审核数据
  getUnCheckedData(params) {
    this.http.getRequest('/specification_evaluations', params).then((response: any) => {
      if (response && response.length > 0) {
        this.unAssess = response;
      }
    });
  }
  // 发送请求获取已审核数据
  getCheckedData(params) {
    this.http.getRequest('/specification_evaluations', params).then((response: any) => {
      if (response && response.length > 0) {
        this.assess = response;
      }
    });
  }

  // tab切换
  segmentChanged(e) {

  }

}
