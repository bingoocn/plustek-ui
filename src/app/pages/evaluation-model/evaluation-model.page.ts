import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-evaluation-model',
  templateUrl: './evaluation-model.page.html',
  styleUrls: ['./evaluation-model.page.scss'],
})
export class EvaluationModelPage implements OnInit {

  public indexes:any = [];
  public indicator_name:string;
  public indicator_id:string;

  public indicators:any = [];

  constructor(public http:HttpService) { }

  ngOnInit() {
    const params = { index_type_code:'01',publish_status_code:'02'};
    this.getIndicator(params);
  }

  // 获取当前发布的《规范》评价模型
  getIndicator(params:any){
    this.http.getRequest('/evaluation_models', params).then((response:any) => {
      if(response && response.length > 0){
        this.indicators = response;
        if(response[0].indicator_sets && response[0].indicator_sets.index_name){
          this.indicator_name = response[0].indicator_sets.index_name;
        }
      }
    })
  }

}
