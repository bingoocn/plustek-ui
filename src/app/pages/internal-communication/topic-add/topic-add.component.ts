import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.scss'],
})
export class TopicAddComponent implements OnInit {

  public communication:any = {
    exchange_proceeding:'',
    exchange_content:'',
    remark:''
  }

  constructor(public http:HttpService,public nav: NavController) { }

  ngOnInit() {}

  // 保存
  saveCommunication(){
    const params = this.communication;
    this.http.postRequest('/communions',params).then((response:any) => {
      this.http.presentToast('保存成功！', 'bottom', 'success');
      this.back();
    })
  }

  // 保存并发布
  saveAndPublish(){
    const params = this.communication;
    this.http.postRequest('/communions',params).then((response:any) => {
      if(response && response.id){
        this.http.putRequest('/communions/' + response.id + '/published','').then((res:any) => {
          this.http.presentToast('保存并发布成功！', 'bottom', 'success');
          this.back();
        })
      }
    })
  }

  // 返回
  back(){
    this.nav.navigateRoot(['/internal-communication']).then(() => {
      location.reload();
    });
  }

}
