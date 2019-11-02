import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';
// 引入modal依赖
import { ModalController } from '@ionic/angular';
import { RolesComponent } from '../../components/modal/roles/roles.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string;
  public password: string;
  public userFlag: boolean = false;
  public pwdFlag: boolean = false;
  public status: boolean = false;
  readonly PortalIp = 'http://10.100.240.163:10002/api';

  constructor(
    private nav: NavController, 
    private router: Router, 
    public http: HttpService,
    public fn: CommonService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    // 至登陆页清除用户及系统所有信息
    localStorage.clear();
  }
  // 表单校验
  validate(type: number) {
    if (type == 1) {
      this.userFlag = false;
      //用户名校验
      let nameReg = /^[a-zA-Z0-9_-]{0,}$/;
      if (!nameReg.test(this.username)) {
        this.http.presentToast('用户名不能含有中文或特殊字符！', 'bottom');
      } else if (this.username == undefined || this.username.length == 0) {
        this.http.presentToast('用户名不能为空！', 'bottom');
      } else if (this.username.length > 25) {
        this.http.presentToast('用户名超过长度限制！', 'bottom');
      }else{
        this.userFlag = true;
      }
    } else if (type == 2) {
      this.pwdFlag = false;
      //6-20个字母、数字
      let pwdReg = /^(\w){6,20}$/;
      if(this.password == undefined || this.password.length == 0) {
        this.http.presentToast('密码不能为空！', 'bottom');
      }
      else{
        this.pwdFlag = true;
      }
    }
    this.userFlag && this.pwdFlag ? this.status = true : this.status = false;
  }
  // 登入系统
  onLogin() {
    if(this.status){
      const params = { username: this.username, password: this.password,grant_type:"password" }
      // 执行登录操作
      this.http.presentLoading('登录中...');
      this.http.loginRequest('/oauth/token', params).then(response => {
        localStorage.setItem("token", response['access_token']);
        // 存储登录人相关信息后进入系统
        this.getInfo().then(res => {
          this.http.hideLoading();
          // 根据角色多少进行分发
          if(res['length'] > 1) {
            this.showModal(res);
            return;
          }
          // 根据当前登录人角色获取系统菜单
          const systemId = JSON.parse(localStorage.getItem("currentSystem")).guid;
          this.http.getRequest("/roles/"+res[0].guid+"/menus", null, this.PortalIp).then(menus => {
            // 校验是否分配底部菜单
            this.fn.checkMenu(menus).then(res => {
              if(res['length'] != 4) {
                this.http.presentAlert('提示', '', '未分配菜单，请联系管理员配置！');
                localStorage.clear();
                return;
              }
              // 存储当前登录人角色信息
              localStorage.setItem("currentRole", JSON.stringify(res[0]));
              // 存储菜单信息
              localStorage.setItem("menu", JSON.stringify(menus));
              this.nav.navigateRoot("/tabs/index", {
                queryParams:{
                    menus: JSON.stringify(menus)
                }
              });
            });
          })
        });
      }, error => {
        localStorage.clear();
        if(error.error) {
          this.http.hideLoading();
          this.http.presentAlert('提示', '', error.error.error_description)
        }
      })
    }
  }
  // 获取登录人相关信息
  getInfo() {
    return new Promise((resolve, reject) => {
      // 当前登录人所具有角色列表
      const mineRoles = [];
      // 获取当前登录人所具有系统
      this.http.getRequest("/user/systems", null, this.PortalIp).then(systems => {
        for(let i=0; i<systems.length; i++) {
          // App标识校验
          if(systems[i].businessSystemCode != "A001") continue;
          // 存储当前系统信息
          localStorage.setItem("currentSystem", JSON.stringify(systems[i]));
          // 获取当前登录人具有角色列表
          this.http.getUser().then(userInfo => {
            this.http.getRequest("/users/"+userInfo['guid']+"/roles", null, this.PortalIp).then(response => {
              for(let k=0; k<response.length; k++) {
                // 处理App端角色
                if(response[k].subordinateSystemId != systems[i].guid) continue;
                mineRoles.push(response[k]);
                localStorage.setItem("roles", JSON.stringify(mineRoles));
                resolve(mineRoles)
              }
            })
          })
        }
      })
    })
  }
  // 前往注册
  toRegister() {
    this.nav.navigateForward('/register');
  }
  // 前往角色选择页
  async showModal(val) {
    const modal = await this.modalController.create({
      component: RolesComponent, 
      componentProps: { 
        'roles': val,
      }
    });
    await modal.present();
  }
}
