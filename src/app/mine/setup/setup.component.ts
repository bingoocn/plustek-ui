import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModifyPasswordComponent } from '../modify-password/modify-password.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {

  formData;//返回的修改密码表单数据

  constructor(public router: Router, public modalController: ModalController, public nav: NavController) { }

  ngOnInit() {}

  async presentModal() {
    let modal = await this.modalController.create({
      showBackdrop:true,
      component: ModifyPasswordComponent
    });
    modal.present();

    //模态框被关闭后会回调该方法 res 为返回值
    modal.onDidDismiss().then(res => {
      console.log(res,"返回的表单数据");
      this.formData = res.data.result;
    })
  }
  // 退出登录
  logout() {
    window.localStorage.removeItem('token');
    this.nav.navigateForward('login');
  }
}
