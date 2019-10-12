import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss'],
})
export class ModifyPasswordComponent implements OnInit {

  pswInfo;

  constructor(public modalController: ModalController, public navParams: NavParams) { }

  ngOnInit() {
    this.pswInfo = {
      oldPsw:'',
      newPsw:'',
      confirmPsw:''
    }
  }

  //确定修改密码
  confirmModify(){
    //校验
    this.modalController.dismiss({
      dismissed: true,
      result: this.pswInfo
    });
  }

  //关闭模态框
  close(){
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
