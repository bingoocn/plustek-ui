import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {

  @ViewChild(IonInfiniteScroll,null) infiniteScroll: IonInfiniteScroll;

  public notices:any = [];
  public page:any = 1;
  public per_page:any = 10;
  public hasMore:boolean = true;
  public title:string = '';

  constructor(public router: Router, public http:HttpService) { }

  ngOnInit() {
    console.log(0)
    const params = { title:this.title,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time' };
    this.getData(params);
  }
  
  // 关键字搜索
  getNotices(ev: any) {
    this.page = 1;
    this.title = ev.target.value;
    const params = { title:this.title,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time' };
    this.getData(params);
    this.infiniteScroll.disabled = false;
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/notices', params).then((response:any) => {
      if(response && response.length > 0){
        this.notices = response;
        if(response.length < this.per_page){
          this.infiniteScroll.disabled = true;
        }else{
          ++this.page;
        }
      }
    });
  }

  // 刷新
  doRefresh(e) {
    this.page = 1;
    this.title = "";
    const params = { title:this.title,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time' };
    this.http.getRequest('/notices', params).then((response:any) => {
      if(response && response.length > 0){
        this.notices = response;
        if(response.length < this.per_page){
          this.infiniteScroll.disabled = true;
        }else{
          ++this.page;
          this.infiniteScroll.disabled = false;
          this.hasMore = true;
        }
        e.target.complete(); // 告诉ion-refresher 更新数据
      }
    });
  }
  // 加载更多
  loadMore(e){
    const params = { title:this.title,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time' };
    this.http.getRequest('/notices', params).then((response:any) => {
      if(response && response.length > 0){
        this.notices = this.notices.concat(response);
        ++this.page;
        //判断下一页有没有数据
        if(response.length < this.per_page){
          e.target.disabled = true;
          this.hasMore = false;
        }
        e.target.complete(); //请求完成数据以后告诉ion-infinite-scroll更新数据
      }
    });
  }
}
