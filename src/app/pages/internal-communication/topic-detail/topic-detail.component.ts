import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
})
export class TopicDetailComponent implements OnInit {

  public topicId:string;
  public topic:any;
  public content:string;
  public comments:any = [];

  constructor(public routeInfo:ActivatedRoute,public router: Router, public http:HttpService) { }

  ngOnInit() {

    // 获取路由传递过来的交流事项id
    this.routeInfo.params.subscribe((params: Params) => this.topicId = params['topicId']);

    if(this.topicId){
      // 查询指定的交流事项
      this.http.getRequest('/communions/' + this.topicId).then((response:any) => {
        if(response) {
          this.topic = response;
        }
      });

      // 查询指定交流事项下的评论
      this.getComments();
    }
  }

  // 查询指定交流事项下的评论
  getComments(){
    const params = {recursive:false};
    this.http.getRequest('/communions/' + this.topicId + '/comments',params).then((response:any) => {
      if(response && response.length > 0) {
        response.forEach((item:any,index:any) => {
          item.img_url = 'assets/headSculpture/default.png';
        })
        this.comments = response;
      }
    });
  }

  // 评论
  comment(){
    const params = {content:this.content};
    this.http.postRequest('/communions/' + this.topicId + '/comments',params).then((response:any) => {
      this.getComments();
      this.content = '';
      this.http.presentToast('保存成功！', 'bottom', 'success');
      this.ngOnInit();
    },(error:any) => {

    })
  }

}
