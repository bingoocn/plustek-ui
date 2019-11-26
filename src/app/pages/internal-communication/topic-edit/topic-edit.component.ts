import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.scss'],
})
export class TopicEditComponent implements OnInit {

  public topicId:string;
  public communication:any = {
    exchange_proceeding:'',
    exchange_content:'',
    remark:''
  }

  constructor(public common: CommonService ,public routeInfo:ActivatedRoute,public router: Router, public http:HttpService,public nav: NavController) { }

  ngOnInit() {
    // 获取路由传递过来的交流事项id
    this.routeInfo.params.subscribe((params: Params) => this.topicId = params['topicId']);
    if(this.topicId){
      // 查询指定的交流事项
      this.http.getRequest('/communions/' + this.topicId).then((response:any) => {
        if(response) {
          if(response.exchange_proceeding) {
            this.communication.exchange_proceeding = response.exchange_proceeding;
          }
          if(response.exchange_content) {
            this.communication.exchange_content = response.exchange_content;
          }
          if(response.remark) {
            this.communication.remark = response.remark;
          }
        }
      });
    }
  }

  // 保存
  saveCommunication(){
    const params = this.communication;
    this.http.putRequest('/communions/' + this.topicId,params).then((response:any) => {
      this.http.presentToast('修改成功！', 'bottom', 'success');
      this.common.eventEmit.emit('getPublishedData','saveCommunication');
      this.back();
    })
  }

  // 保存并发布
  saveAndPublish(){
    const params = this.communication;
    this.http.putRequest('/communions/' + this.topicId,params).then((response:any) => {
      if(response && response.id){
        this.http.putRequest('/communions/' + response.id + '/published','').then((res:any) => {
          this.http.presentToast('保存并发布成功！', 'bottom', 'success');
          this.common.eventEmit.emit('getPublishedData','saveAndPublish');
          this.back();
        })
      }
    })
  }

  // 返回
  back(){
    this.nav.navigateRoot(['/internal-communication']);
  }

}
