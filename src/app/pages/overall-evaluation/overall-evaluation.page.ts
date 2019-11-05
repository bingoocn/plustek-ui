import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-overall-evaluation',
  templateUrl: './overall-evaluation.page.html',
  styleUrls: ['./overall-evaluation.page.scss'],
})
export class OverallEvaluationPage implements OnInit {
  @ViewChild(IonInfiniteScroll,null) infiniteScroll: IonInfiniteScroll;

  public evaluationValue:any = [];
  public page:any = 1;
  public per_page:any = 10;
  public hasMore:boolean = true;
  constructor(public http:HttpService) { }

  ngOnInit() {
    this.getData();
  }
  // 发送请求获取数据
  getData(){
    this.http.getRequest('/evaluation_results').then((response:any) => {
      if(response && response.length > 0){
        this.evaluationValue = response;
      }
    });
  }
   // 刷新
   doRefresh(e) {
    this.page = 1;
    this.http.getRequest('/evaluation_results').then((response:any) => {
      if(response && response.length > 0){
        this.evaluationValue = response;
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
    this.http.getRequest('/evaluation_results').then((response:any) => {
      if(response && response.length > 0){
        this.evaluationValue = this.evaluationValue.concat(response);
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
