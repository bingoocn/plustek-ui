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
  readonly PortalIp = 'http://10.100.240.163:10002/api';

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
    this.http.getRequest("/roles/"+e.guid+"/menus", null, this.PortalIp).then(menus => {
      this.fn.checkMenu(menus).then(res => {
        if(res['length'] != 4) {
          this.http.presentAlert('提示', '', '未分配菜单，请联系管理员配置！');
          localStorage.clear();
          return;
        }
        localStorage.setItem('currentRole', JSON.stringify(e));
        // 存储并登入系统
        localStorage.setItem("menu", JSON.stringify(menus));
        this.nav.navigateRoot("/tabs/index", {
          queryParams:{
              menus: JSON.stringify(menus)
          }
        });
      });
      this.navParams.data.modal.dismiss();
    })
  }
  // 关闭模态框
  doClose() {
    this.navParams.data.modal.dismiss();
    localStorage.clear();
  }
}
