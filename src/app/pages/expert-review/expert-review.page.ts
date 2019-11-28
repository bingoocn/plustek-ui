import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-expert-review',
  templateUrl: './expert-review.page.html',
  styleUrls: ['./expert-review.page.scss'],
})
export class ExpertReviewPage implements OnInit {

  public expertEvaluations:any = [];

  constructor(public http:HttpService) { }

  ngOnInit() {
    const params = { sort:'-year,data_unit_code'};
    this.getData(params);
  }

  // 关键字搜索
  getExpertEvaluations(ev: any) {
    // this.ngOnInit();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.expertEvaluations = this.expertEvaluations.filter((item:any) => {
        return (item.unit.group.name.indexOf(val) > -1);
      })
    }
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/expert_reviews', params).then((response:any) => {
      if(response && response.length > 0){
        this.expertEvaluations = response;
      }
    })
  }

}
