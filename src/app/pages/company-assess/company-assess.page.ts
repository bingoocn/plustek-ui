import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-company-assess',
  templateUrl: './company-assess.page.html',
  styleUrls: ['./company-assess.page.scss'],
})
export class CompanyAssessPage implements OnInit {
  public assess: any = [];
  public unit_id: string = ''; // 当前登录人所属组织机构id
  constructor(public router: Router, public http: HttpService) { }


  ngOnInit() {
    this.unit_id = window.localStorage.getItem("unitId");
    // 获取当前登录人所属单位信息
      if(this.unit_id){
        const params = { apply_id: this.unit_id };
        this.getData(params);
      }
  }
  // 发送请求获取数据
  getData(params) {
    this.http.getRequest('/specification_evaluations', params).then((response: any) => {
      if (response && response.length > 0) {
        this.assess = response;
      }
    });
  }

  // 上报
  toReport(id: any ) {
    this.http.putRequest('/specification_evaluations/' + id + '/reported','').then((response:any) => {
      if (response) {
        this.http.presentToast('上报成功', 'bottom', 'success');
      }
    })
  }

}
