import {Component, ElementRef, OnInit} from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.page.html',
  styleUrls: ['./workbench.page.scss'],
})
export class WorkbenchPage implements OnInit {
  // 当前登录人所具有角色
  readonly currentRole:any = JSON.parse(localStorage.getItem("currentRole"));
  // 当前登录人角色缩写
  public role:any;

  constructor(
    private el: ElementRef,
    private nav: NavController, 
    public fn: CommonService,
    public http:HttpService
  ) {
　}

  ngOnInit() {
    // 通过延时操作更改shadow dom的样式
    setTimeout(() => {
      const toolbar = this.el.nativeElement.querySelectorAll('ion-tab-button');
      for(let i=0; i<toolbar.length; i++) {
        toolbar[i].shadowRoot.querySelector('a').style.padding = '0';
      }
    }, 1000);
    // 根据登录人角色控制工作台各模块入口
    this.http.getRequest("/sys_param?param_name="+this.currentRole.guid, null).then(res => {
      this.role = JSON.parse(res.param_value).abbreviation;
      console.log(this.role)
    })
  }
}
