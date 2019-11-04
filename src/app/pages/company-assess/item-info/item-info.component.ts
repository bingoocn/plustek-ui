import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';
import { ModalController } from '@ionic/angular';
import {ModalPageComponent} from './modal-page/modal-page.component'

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
  public indexes: any =[];
  public slideOpts: any = {
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
    this.routeInfo.queryParams.subscribe((data) => {
      this.questId = data.questId;
      this.indicatorId = data.indicatorId,
      this.indexId = data.indexId});
    const params = { indicator_pid: this.indexId, index_level_type_code: '03', scort: 'index_code'};
    this.getIndicator(params);
  }
  // 获取当前试题得到具体的题目
  getIndicator(params: any) {
    this.http.getRequest(`/questionnaires/${this.questId}/tree`).then((response: any) => {
      if (response && response.length > 0) {
        response.forEach((e,i)=>{
          // 这里的判断有点牵强，但是可以用
          if(e.index_notes){
            this.items.push(e);
          }
        })

        this.items.forEach((e,i)=>{
          if(e.options && e.options.length>0){
            e.options.forEach((el,i)=>{
              el.checked = false;
            })
          }
        })

        console.log(this.items,'显示的数据')

      }
    })

    // this.http.getRequest('/indicator_sets/' + this.indicatorId + '/indicators').then(( response: any) => {
      // if (response && response.length > 0) {
      //   response.forEach((e,i)=>{
      //     if(e.index_level_type.code ==='03'){
      //       this.indexes.push(e)
      //     }
      //   })
        // 获取选项
        // this.indexes.forEach((e,i)=>{
        //   this.http.getRequest(`/questionnaires/${this.questId}/topics?scort=&indicator_id=` + e.id).then((response: any) => {
        //     if (response && response.length > 0) {
        //       for(let k=0; k<response[0].length; k++) {
        //         response[0][k]['flag'] = false;
        //       }
        //       this.items[i] = response[0];
        //       console.log(this.items,'dddddd')
        //     }
        //   })
        // })
      // }
    // })

    // this.http.getRequest(`/indicator_sets/${this.indicatorId}/indicators`, params).then((response: any) => {
    //   if (response && response.length > 0) {
    //     const res: any = response;
    //     res.forEach((e: any, i: any) => {
    //       this.http.getRequest(`/questionnaires/${this.questId}/topics?scort=&indicator_id=` + e.id).then((response: any) => {
    //         if (response && response.length > 0) {
    //           for(let k=0; k<response[0].length; k++) {
    //             response[0][k]['flag'] = false;
    //           }
    //           this.items[i] = response[0];
    //         }
    //       })
    //     })
    //   }
    // })
  }
  saveItem() {
    const params = {
      options: this.result,
      index_slave_id: this.resultArr.index_slave_id
    };
    this.http.postRequest(`/specification_evaluations/${this.questId}/self_evaluations`, params).then((response: any) => {
      // this.http.presentToast('保存成功！', 'bottom', 'success');
    })
  }
  changeOption(val) {
    // this.momentArr.push({
    //   index_slave_id: id,
    //   item: item,
    // })
    console.log(val)

  }
  // 处理得到的值,留下选中的选项
  formate() {
    // 过滤掉不需要的数据
    this.momentArr.forEach((e: any, i: any) => {
      if (e.item.flag) {
        this.resultArr.push({
          index_slave_id: e.index_slave_id,
          option: e.item,
        })
      }
    })
    // 处理成最终的样式
    this.resultArr.forEach((e: any, i: any) => {
      this.result.push(e.option)
    });
    this.result.forEach((e: any, i: any) => {
      e.topics_slave_id = e.id;
      e.supplementary_content = e.topics_content;
    })
  }
  // 上一题
  prev() {
    this.slide.slidePrev();
  }
  // 下一题
  next() {
    this.slide.slideNext();
  }
  slideDidChange() {
    this.formate();
    console.log(this.result,'最后的结果值')

    // this.saveItem()
  }
  async presentModal(val) {
    const modal =  await this.modalController.create({
      component: ModalPageComponent,
      showBackdrop:true,
      componentProps: { value: val }
    });
    return await modal.present();
  }
}
