import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
  public searchfiltrate = ['000'];
  public conent:string;

  constructor(public modalController: ModalController,public navParams: NavParams) { 
    this.conent = this.navParams.data.value;
  }

  ngOnInit() {}

  cancel() {//取消
    this.modalController.dismiss({
        result: 'modal_cancel'
    });
  }

  ok() {//确定
    this.modalController.dismiss({
        result: this.searchfiltrate
    });
  }

}
