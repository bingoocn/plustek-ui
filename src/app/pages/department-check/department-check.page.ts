import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-department-check',
  templateUrl: './department-check.page.html',
  styleUrls: ['./department-check.page.scss'],
})
export class DepartmentCheckPage implements OnInit {

  public checkTabValue: string = ''; // 当前tab值
  public unit_id: string = ''; // 当前登录人所属组织机构id
  public unAssess: any = []; // 待审核
  public assess: any = []; // 已审核

  constructor(public common: CommonService ,public routeInfo:ActivatedRoute ,public router: Router, public http: HttpService) {
    this.common.eventEmit.on('getData',(result)=>{
      this.checkTabValue = result;
      const checkedParams = { evaluation_status_code: '03,04,05,06', sort: '-evaluation_date', apply_id: this.unit_id };
      this.getCheckedData(checkedParams);
      const uncheckedParams = { evaluation_status_code: '02', sort: '-evaluation_date', apply_id: this.unit_id };
      this.getUnCheckedData(uncheckedParams);
    })
   }

  ngOnInit() {
    this.unit_id = window.localStorage.getItem("unitId");
    // 获取传递过来的状态（已审核，未审核）
    if(this.routeInfo.snapshot.queryParams['check_state']){
      this.checkTabValue = this.routeInfo.snapshot.queryParams['check_state'];
    }else{
      this.checkTabValue = "unchecked"
    }
    // 获取当前登录人所属单位信息
      if (this.unit_id) {
        const uncheckedParams = { evaluation_status_code: '02', sort: '-evaluation_date', apply_id: this.unit_id };
        this.getUnCheckedData(uncheckedParams);
        const checkedParams = { evaluation_status_code: '03,04,05,06', sort: '-evaluation_date', apply_id: this.unit_id };
        this.getCheckedData(checkedParams);
      }
  }
  // 发送请求获取待审核数据
  getUnCheckedData(params) {
    this.http.getRequest('/specification_evaluations', params).then((response: any) => {
      if (response) {
        this.unAssess = response;
      }
    });
  }
  // 发送请求获取已审核数据
  getCheckedData(params) {
    this.http.getRequest('/specification_evaluations', params).then((response: any) => {
      if (response) {
        this.assess = response;
      }
    });
  }

  // tab切换
  segmentChanged(e) {

  }

}
