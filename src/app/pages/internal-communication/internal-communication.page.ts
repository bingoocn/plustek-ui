import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-internal-communication',
  templateUrl: './internal-communication.page.html',
  styleUrls: ['./internal-communication.page.scss'],
})
export class InternalCommunicationPage implements OnInit {

  @ViewChild(IonInfiniteScroll,null) infiniteScroll: IonInfiniteScroll;

  public topics:any = [];
  public page:any = 1;
  public per_page:any = 10;
  public hasMore:boolean = true;
  public title:any;
  public exchange_proceeding:string = '';
  public person_id:string = '';
  public mineFlag:boolean = false;

  constructor(public route:ActivatedRoute, public http:HttpService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((data)=>{ 
      this.title = data.title;
      if(this.title === '我的主题'){
        this.mineFlag = true;
      }
    });
    if(this.mineFlag){
      // 获取当前登录人信息
      this.http.getUser().then((response:any) => {
        if(response){
          if(response.guid){
            this.person_id = response.guid;
            const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time',person_id:this.person_id };
            this.getData(params);
          }
        }
      });
    }else{
      const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time',person_id:this.person_id };
      this.getData(params);
    }

  }

  // 关键字搜索
  getTopics(ev: any) {
    this.page = 1;
    this.exchange_proceeding = ev.target.value;
    const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time' };
    this.getData(params);
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/communions', params).then((response:any) => {
      if(response && response.length > 0){
        this.topics = response;
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
    this.exchange_proceeding = "";
    const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time' };
    this.http.getRequest('/communions', params).then((response:any) => {
      if(response && response.length > 0){
        this.topics = response;
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
    const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',page:this.page,per_page:this.per_page,sort:'-publish_time' };
    this.http.getRequest('/communions', params).then((response:any) => {
      if(response && response.length > 0){
        this.topics = this.topics.concat(response);
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
