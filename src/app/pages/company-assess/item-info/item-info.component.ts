import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';
import { ModalController } from '@ionic/angular';
import {ModalPageComponent} from './modal-page/modal-page.component'
import { from } from 'rxjs';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss'],
})
export class ItemInfoComponent implements OnInit {
  public indicatorId: string;
  public indexId: string;
  public questId: string; // 问卷的ID
  public items: any = []; // 试卷列表
  public slideOpts:any = {
    effect: 'flip',
    speed: 400,
    loop: false,
    // autoplay: { delay: 2000 },
    pager: false
  }

  constructor(public modalController: ModalController,
              public routeInfo: ActivatedRoute,
              public http: HttpService,
              private router: Router,
              public common: CommonService, ) { }
  ngOnInit() {
    // 获取传递过来的规范评价id
    this.routeInfo.queryParams.subscribe((data) => {this.questId = data.questId, this.indicatorId = data.indicatorId; this.indexId = data.indexId});
    const params = { indicator_pid: this.indexId, index_level_type_code: '03', scort: 'index_code'};
    this.getIndicator(params);
  }
  // 获取当前试题得到具体的题目
  getIndicator(params: any) {
    this.http.getRequest(`/indicator_sets/${this.indicatorId}/indicators`, params).then((response: any) => {
      if (response && response.length > 0) {
        const res: any = response;
        console.log(response,'注释')
        res.forEach((e: any, i: any) => {
          this.http.getRequest(`/questionnaires/${this.questId}/topics?scort=&indicator_id=` + e.id).then((response: any)=>{
            if (response && response.length > 0) {
              console.log(response,'不知道啊')
              this.items[i] = response[0];
            }
          })
        })
      }
    })
  }
  postForm() {
    const params = {};
    const id = '';
    this.http.postRequest(`/specification_evaluations/${id}/self_evaluations`, params).then((response: any) => {
      this.http.presentToast('保存成功！', 'bottom', 'success');
    })
  }
  async presentModal(val) {
    const modal =  await this.modalController.create({
      component: ModalPageComponent,
      showBackdrop:true,
      // component: SearchmodalPage,
      componentProps: { value: val }
    });
    return await modal.present();
  }
}
