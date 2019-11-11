import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-internal-communication',
  templateUrl: './internal-communication.page.html',
  styleUrls: ['./internal-communication.page.scss'],
})
export class InternalCommunicationPage implements OnInit {

  public publishedTopics:any = [];// 已发布的
  public unblishedTopics:any = [];// 未发布的
  public communionTabValue: string;//当前tab值
  public exchange_proceeding:string = '';// 已发布模糊查询
  public un_exchange_proceeding:string = '';//未发布模糊查询

  constructor(public http:HttpService,public nav: NavController) { }

  ngOnInit() {
    this.communionTabValue = 'published';// 默认显示已发布列表

    // 获取已发布的数据
    const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',sort:'-publish_time' };
    this.getPublishedData(params);

    // 获取当前登录人信息
    this.http.getUser().then((response:any) => {
      if(response){
        if(response.guid){
          const unParams = { publish_status_code: '01',sort:'-publish_time' };
          this.getUnpublishedData(unParams,response.guid);
        }
      }
    })
  }

  // 已发布关键字搜索
  getTopics(ev: any) {
    this.exchange_proceeding = ev.target.value;
    const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',sort:'-publish_time' };
    this.getPublishedData(params);
  }

  // 未发布关键字搜索
  getUnTopics(ev: any) {
    this.exchange_proceeding = ev.target.value;
    const params = { exchange_proceeding:this.un_exchange_proceeding,publish_status_code: '02',sort:'-publish_time' };
    this.getPublishedData(params);
  }

  // 发送请求获取已发布数据
  getPublishedData(params:any){
    this.http.getRequest('/communions', params).then((response:any) => {
      if(response && response.length > 0){
        this.publishedTopics = response;
      }
    });
  }

  // 发送请求获取未发布的当前登录人保存的数据
  getUnpublishedData(params:any,person_id){
    this.http.getRequest('/communions', params).then((response:any) => {
      if(response && response.length > 0){
        this.unblishedTopics = [];
        response.forEach(element => {
          if(element.creator && element.creator.id){
            if(element.creator.id === person_id){
              this.unblishedTopics.push(element);
            }
          }
        });
      }
    })
  }

  // 发布
  toPublish(id){
    this.http.putRequest('/communions/' + id + '/published','').then((res:any) => {
      this.http.presentToast('发布成功！', 'bottom', 'success');
      location.reload();
    })
  }

  // 查看详情调用浏览接口
  toDetail(id) {
    // 获取当前登录人信息
    this.http.getUser().then((response:any) => {
      if(response){
        if(response.guid){
          // 调用浏览数接口
          this.http.postRequest('/communions/' + id + '/view?pubname_id=' + response.guid,'').then((response:any) => {
            // console.log('浏览');
          })
        }
      }
    })
  }

  // tab切换事件
  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
  }

  // 返回
  back() {
    this.nav.navigateBack('/tabs/workbench');
  }
}
