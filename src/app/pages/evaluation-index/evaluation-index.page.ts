import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-evaluation-index',
  templateUrl: './evaluation-index.page.html',
  styleUrls: ['./evaluation-index.page.scss'],
})
export class EvaluationIndexPage implements OnInit {

  public indexes:any = [];
  public indicator_name:string;
  public indicator_id:string;

  constructor(public http:HttpService) { }

  ngOnInit() {
    const params = { index_type_code:'01',start_status_code:'01'};
    this.getIndicator(params);
  }
  // 获取当前使用的《规范》评价指标及其下的第一层维度
  getIndicator(params:any){
    this.http.getRequest('/indicator_sets', params).then((response:any) => {
      if(response && response.length > 0){
        this.indicator_id = response[0].id;
        if(response[0].index_name){
          this.indicator_name = response[0].index_name;
        }
        if(response[0].id){
          this.http.getRequest('/indicator_sets/' + response[0].id + '/indicators').then((response:any) => {
            if(response && response.length > 0){
              this.indexes = [];
              response.forEach(element => {
                if(element.index_level_type && element.index_level_type.code && element.index_level_type.code == '01'){
                  this.indexes.push({id:element.id,index_name:element.index_name,index_num:element.index_num});
                }
              });
            }
          })
        }
      }
    })
  }
}
