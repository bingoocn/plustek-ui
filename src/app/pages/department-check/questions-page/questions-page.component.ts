import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';
import { ModalController } from '@ionic/angular';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss'],
})
export class QuestionsPageComponent implements OnInit {
  public indicatorId: string;
  public showSave: boolean = false;
  public detail: any = []; // 审核数据
  public indexId: string;
  public questId: string; // 问卷的ID
  public items: any = []; // 试卷列表
  public momentArr: any = []; // 暂时存放的选中数组
  public resultArr: any = []; // 过滤选中数组
  public result: any = []; // 保存选中数组
  public indexes: any = [];
  public selfEvaluations: any = []; // 保存的数组
  public self_evaluations: any; // 返回的数据
  public companyId: any; // 企业自评ID
  public evaluationLevelCode: string;
  public leader_review: any; // 部门审核批阅
  public approvalDetail: any; // 审核数据回显
  public showDepartment: any = false; // 部门回显
  public slideOpts: any = {
    effect: 'flip',
    speed: 400,
    loop: false,
    // autoplay: { delay: 2000 },
    pager: false,
    spaceBetween: 100,
  }
  @ViewChild("slide", { static: false }) slide;
  constructor(public nav: NavController, public modalController: ModalController,
    public routeInfo: ActivatedRoute,
    public http: HttpService,
    private router: Router,
    public common: CommonService, ) { }
  ngOnInit() {
    // 获取传递过来的规范评价id
    this.routeInfo.queryParams.subscribe((data) => {
      this.companyId = data.companyId
    });
    this.getFormData();
  }
  // 获取自评的信息
  getFormData() {
    this.http.getRequest(`/specification_evaluations/${this.companyId}`).then((response: any) => {
      if (response) {
        this.self_evaluations = response.self_evaluations;
        this.evaluationLevelCode = response.evaluation_level.code;
        const params = { indicator_pid: this.indexId, index_level_type_code: '03', scort: 'index_code' };
        this.getIndicator(params);
      }
    })
    // 部门审核数据，用来回显
    this.http.getRequest(`/specification_evaluations/${this.companyId}/department_check`).then((response: any) => {
      if (response) {
        this.showDepartment = true;
        this.approvalDetail = response.approval_detail;
        this.leader_review = response.leader_review;
      }
    })


  }
  // 获取当前试题得到具体的题目
  getIndicator(params: any) {
    const par = { index_type_code: '01', start_status_code: '01', evaluation_level_code: this.evaluationLevelCode };
    this.http.getRequest(`/evaluation_models`, par).then((response: any) => {
      this.questId = response[0].id;

      this.http.getRequest(`/questionnaires/${this.questId}/tree`).then((response: any) => {
        if (response && response.length > 0) {
          response.forEach((e: any, i: any) => {
            // 这里的判断有点牵强，但是可以用
            if (e.index_notes) {
              this.items.push(e);
            }
          })
          // 先默认给每个选项给checked标识
          this.items.forEach((e: any, i: any) => {
            e.approval_status_code = ''; // 这个是通过不通过的标识
            if (e.options && e.options.length > 0) {
              e.options.forEach((el: any, i: any) => {
                el.checked = false;
              })
            }
          })
          // 回显
          if (this.self_evaluations && this.self_evaluations.length > 0) {
            this.items.forEach((e: any, i: any) => {
              // 题目答案回显
              this.self_evaluations.forEach((el: any, j: any) => {
                if (e.id === el.index_slave_id) {
                  e.options.forEach((item: any) => [
                    el.options.forEach((element: any) => {
                      if (item.id === element.topics_slave_id) {
                        item.checked = true;
                        if (item.topics && item.topics_type === '02') {
                          item.topics_content = element.supplementary_content
                        }

                      }
                    })
                  ])
                }
              })
              // 部门审核结果回显
              if (this.approvalDetail && this.approvalDetail.length > 0) {
                this.approvalDetail.forEach((el: any, j: any) => {
                  if (el.indicator_id === e.id) {
                    e.approval_status_code = el.approval_status_code
                  }

                })

              }

            })
          }
        }
      })
    })

  }
  // 选中选项时
  changeOption(item: any, id: any) {
    this.momentArr.push({
      index_slave_id: id,
      item: item,
    })
  }
  // 保存选中的选项
  saveItem() {
    this.itemsFormate();
    const params = {
      leader_review: this.leader_review, // 部门审批留言
      detail: this.detail
    };
    this.http.postRequest(`/specification_evaluations/${this.companyId}/department`, params).then((response: any) => {
      if (response) {
        this.http.putRequest(`/specification_evaluations/${this.companyId}/reported`, '').then((response) => {
          console.log('上报成功！！')
          // 跳转到审核列表页面
          this.nav.navigateForward("/department-check")
        })
      }
    })
  }
  // 下一步按钮
  toNext() {
    this.showSave = true;
  }
  // 处理得到的数据
  itemsFormate() {
    this.items.forEach((e: any, i: any) => {
      if (e.approval_status_code) {
        this.detail.push({
          indicator_id: e.id,
          approval_status_code: e.approval_status_code,
        })
      }
    })
  }

  // 处理得到的值,留下选中的选项
  formate() {
    // 过滤掉不需要的数据
    this.momentArr.forEach((e: any, i: any) => {
      if (e.item.checked) {
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
  // 离开这一页时
  slideDidChange() {
    this.formate();
  }
  async presentModal(val) {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      showBackdrop: true,
      componentProps: { value: val }
    });
    return await modal.present();
  }

}
