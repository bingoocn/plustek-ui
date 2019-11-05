import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  // 当前登录人所具有角色
  readonly currentRole:any = JSON.parse(localStorage.getItem("currentRole"));
  // 当前登录人角色缩写
  public role:any;

  constructor(
    public route:ActivatedRoute,
    public http: HttpService,
    public nav: NavController
  ) { }

  ngOnInit() { 
    // 根据登录人角色控制工作台各模块入口
    this.http.getRequest("/sys_param?param_name="+this.currentRole.guid, null).then(res => {
      this.role = JSON.parse(res.param_value).abbreviation;
      console.log(this.role)
    })
  }
}
