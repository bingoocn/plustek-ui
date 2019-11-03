import { Component, OnInit, ViewChild } from '@angular/core';
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
  public momentArr: any = []; // 暂时存放的选中数组
  public resultArr: any = []; // 过滤选中数组
  public result: any = []; // 保存选中数组
  public slideOpts:any = {
    effect: 'flip',
    speed: 400,
    loop: false,
    // autoplay: { delay: 2000 },
    pager: false,
    spaceBetween: 100,
  }
  @ViewChild("slide", { static: false }) slide;
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
        res.forEach((e: any, i: any) => {
          this.http.getRequest(`/questionnaires/${this.questId}/topics?scort=&indicator_id=` + e.id).then((response: any)=>{
            if (response && response.length > 0) {
              for(let k=0; k<response[0].length; k++) {
                response[0][k]['flag'] = false;
              }
              this.items[i] = response[0];
            }
          })
        })
      }
    })
  }
  postForm() {
    this.formate();
    const params = {
      options:this.result,
      index_slave_id:this.resultArr.index_slave_id
    };
    this.http.postRequest(`/specification_evaluations/${this.questId}/self_evaluations`, params).then((response: any) => {
      this.http.presentToast('保存成功！', 'bottom', 'success');
    })
  }
  aa(item, id) {
    this.momentArr.push({
      index_slave_id:id,
      item:item,
    })
  }
  // 处理得到的值,留下选中的选项
  formate(){
    // 过滤掉不需要的数据
    this.momentArr.forEach((e,i)=>{
      if(e.item.flag){
        this.resultArr.push({
          index_slave_id:e.index_slave_id,
          option:e.item,
        })
      }
    })
    // 处理成最终的样式
    this.resultArr.forEach((e,i)=>{
      this.result.push(e.option)
    });
    this.result.forEach((e,i)=>{
      e.topics_slave_id=e.id;
      e.supplementary_content=e.topics_content;
    })
  }
  getGuid(){
    
  }
  prev() {
    this.slide.slidePrev();
  }
  next() {
    // this.postForm();
    this.slide.slideNext();
  }
  slideDidChange() {
    this.postForm()
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
