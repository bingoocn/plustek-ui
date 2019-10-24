import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-leader-review',
  templateUrl: './leader-review.page.html',
  styleUrls: ['./leader-review.page.scss'],
})
export class LeaderReviewPage implements OnInit {

  public evaluationTabValue: string;
  public noEvaluations: any = [];
  public evaluations: any = [];

  constructor(public http:HttpService) { }

  ngOnInit() {
    const params = { evaluation_level_code: '' };
    this.getData(params);
    this.evaluationTabValue = 'notEvaluated';
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/specification_mon_evaluations', params).then((response:any) => {
      if(response && response.length > 0){
        this.noEvaluations = response;
      }
    });
  }

  // tab切换事件
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
