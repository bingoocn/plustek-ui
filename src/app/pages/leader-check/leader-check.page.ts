import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-leader-check',
  templateUrl: './leader-check.page.html',
  styleUrls: ['./leader-check.page.scss'],
})
export class LeaderCheckPage implements OnInit {


  public checkTabValue: string;//当前tab值
  public unit_id:string = '';// 当前登录人所属组织机构id
  public unAssess: any = [];//待审核
  public assess: any = [];//已审核

  constructor(public common: CommonService ,public router: Router, public http: HttpService) { 
    this.common.eventEmit.on('getData',(result)=>{
      this.checkTabValue = result;
      const checkedParams = { evaluation_status_code:'05',sort:'-evaluation_date',apply_id:this.unit_id };
      this.getCheckedData(checkedParams);
    })
  }

  ngOnInit() {
    this.checkTabValue = 'unchecked';// 默认显示待审核的
    // 获取当前登录人所属单位信息
    this.unit_id = window.localStorage.getItem("unitId");
      if(this.unit_id){
        const uncheckedParams = { evaluation_status_code:'03',sort:'-evaluation_date',apply_id:this.unit_id };
        this.getUnCheckedData(uncheckedParams);
        const checkedParams = { evaluation_status_code:'05',sort:'-evaluation_date',apply_id:this.unit_id };
        this.getCheckedData(checkedParams);
      }
  }

  // 发送请求获取待审核数据
  getUnCheckedData(params) {
    this.http.getRequest('/specification_evaluations',params).then((response: any) => {
      if (response && response.length > 0) {
        this.unAssess = response;
      }
    });
  }

  // 发送请求获取已审核数据
  getCheckedData(params) {
    this.http.getRequest('/specification_evaluations',params).then((response: any) => {
      if (response && response.length > 0) {
        this.assess = response;
      }
    });
  }

  // tab切换
  segmentChanged(e){

  }

}
