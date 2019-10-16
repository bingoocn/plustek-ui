import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

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
  public errorMsg: string;
  public status: boolean = false;

  constructor(private nav: NavController, private router: Router, public http:HttpService) { }

  ngOnInit() {
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
      }else if (this.password.length < 6 || this.password.length > 20) {
        this.http.presentToast('密码长度为6~20位', 'bottom');
      } else if (!pwdReg.test(this.password)) {
        this.http.presentToast('密码由字母、数字组成', 'bottom');
      }else{
        this.pwdFlag = true;
      }
    }
    this.userFlag && this.pwdFlag ? this.status = true : this.status = false;
  }

  onLogin() {
    this.http.presentLoading('努力登录中...');
    this.http.loginRequest('/107-33', { userName: this.username, password: this.password }).then(response => {
      this.http.hideLoading();
      window.localStorage.setItem("token", response['showapi_res_id']);
      this.nav.navigateRoot("/tabs/index");
    })
  }
  toRegister() {
    this.nav.navigateForward('/register');
  }
}
