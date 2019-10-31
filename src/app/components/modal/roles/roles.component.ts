import { Component, OnInit } from '@angular/core';

import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles:any = this.navParams['roles'];
  constructor(
    public navParams: NavParams,
    private nav: NavController
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
