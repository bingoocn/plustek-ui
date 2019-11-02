import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-evaluation-model-second-level',
  templateUrl: './evaluation-model-second-level.component.html',
  styleUrls: ['./evaluation-model-second-level.component.scss'],
})
export class EvaluationModelSecondLevelComponent implements OnInit {

  public indicator_id:string; // 传过来的评价模型id
  public indicator_name:string; // 规范评价名称
  public level_name:string; // 级别名称
  public indexes:any = []; // 维度集合

  constructor(public routeInfo:ActivatedRoute, public router: Router, public http:HttpService) { }

  ngOnInit() {
    // 获取路由传递过来的评价模型id
    this.routeInfo.params.subscribe((params: Params) => this.indicator_id = params['indexId']);
    if(this.indicator_id){
      this.http.getRequest('/evaluation_models/' + this.indicator_id).then((response:any) => {
        if(response  && response.indicator_sets && response.indicator_sets.index_name){
          this.indicator_name = response.indicator_sets.index_name;
        }
        if(response && response.evaluation_level && response.evaluation_level.name){
          this.level_name = response.evaluation_level.name;
        }

        if(response && response.model_items && response.model_items.length > 0){
          this.indexes = [];
          response.model_items.forEach(element => {
            if(element.indicator && element.indicator.index_level_type && element.indicator.index_level_type.code && element.indicator.index_level_type.code == '01'){
              this.indexes.push(element);
            }
          })
        }
      })
    }
  }

}
