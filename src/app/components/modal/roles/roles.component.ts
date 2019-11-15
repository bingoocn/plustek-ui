import { Component, OnInit } from '@angular/core';

import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {

  public roles:any = this.navParams['roles'];
  readonly PortalIp = 'http://10.100.240.200:10002/api';

  constructor(
    public navParams: NavParams,
    private nav: NavController,
    public http: HttpService,
    public fn: CommonService
  ) { }

  ngOnInit() {
  }
  // 存储当前登录人登入角色
  onClick(e) {
    localStorage.setItem('currentRole', JSON.stringify(e));
    this.nav.navigateRoot("/tabs/index");
    this.navParams.data.modal.dismiss();
  }
  // 关闭模态框
  doClose() {
    this.navParams.data.modal.dismiss();
    localStorage.clear();
  }
}
