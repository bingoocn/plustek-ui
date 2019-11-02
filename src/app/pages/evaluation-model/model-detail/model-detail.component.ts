import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss'],
})
export class ModelDetailComponent implements OnInit {

  public indicator_id:string; // 传过来的评价模型id
  public indicator_name:string; // 规范评价名称
  public dimension_id:string; // 传过来的维度id
  public dimension_name:string; // 维度名称
  public level_name:string; // 级别名称
  public topics:any = []; // 题目集合

  constructor(public routeInfo:ActivatedRoute, public router: Router, public http:HttpService) { }

  ngOnInit() {
    // 获取传递过来的评价模型id
    this.routeInfo.queryParams.subscribe((data)=>{ 
      this.indicator_id = data.indicatorId;
    });
    // 获取路由传递过来的维度id
    this.routeInfo.params.subscribe((params: Params) => this.dimension_id = params['indexId']);

    // 查询指定的评价模型
    if(this.indicator_id){
      this.http.getRequest('/evaluation_models/' + this.indicator_id).then((response:any) => {
        // 获取规范评价指标名称
        if(response  && response.indicator_sets && response.indicator_sets.index_name){
          this.indicator_name = response.indicator_sets.index_name;
        }
        // 获取级别
        if(response && response.evaluation_level && response.evaluation_level.name){
          this.level_name = response.evaluation_level.name;
        }
        // 获取维度名称及组织题目集合
        if(this.dimension_id){
          this.topics = [];
          if(response && response.model_items && response.model_items.length > 0){
            response.model_items.forEach(element => {
              // 获取维度名称（带标号的）
              if(element.indicator && element.indicator && element.indicator.id){
                if(element.indicator.id === this.dimension_id){
                  this.dimension_name = element.indicator.index_num + element.indicator.index_name;
                }
              }
              // 过滤数据组织题目集合
              if(element.indicator && element.indicator && element.indicator.pid){
                if(element.indicator.pid === this.dimension_id){
                  element.children = [];
                  response.model_items.forEach(el => {
                    if(el.indicator && el.indicator.pid){
                      if(el.indicator.pid === element.indicator.id){
                        if(element["children"]){
                          var obj = {};
                          obj["id"] = el.indicator.id;
                          obj["index_name"] = el.indicator.index_name;
                          obj["index_num"] = el.indicator.index_num;
                          if(el.topics_describe){
                            obj["topics_describe"] = el.topics_describe;
                          }
                          if(el.options && el.options.length > 0){
                            obj["options"] = [];
                            el.options.forEach((item,index) => {
                              if(item.topics_type && item.topics_type.code && item.topics_type.code === '01'){
                                obj["options"].push(item);
                              }
                            })
                          }
                          element["children"].push(obj);
                        }else{
                          element["children"] = [];
                          var obj = {};
                          obj["id"] = el.indicator.id;
                          obj["index_name"] = el.indicator.index_name;
                          obj["index_num"] = el.indicator.index_num;
                          if(el.topics_describe){
                            obj["topics_describe"] = el.topics_describe;
                          }
                          if(el.options && el.options.length > 0){
                            obj["options"] = [];
                            el.options.forEach((item:any) => {
                              if(item.topics_type && item.topics_type.code && item.topics_type.code === '01'){
                                obj["options"].push(item);
                              }
                            })
                          }
                          element["children"].push(obj);
                        }
                      }
                    }
                  })
                  this.topics.push({
                    id:element.indicator.id,
                    index_name:element.indicator.index_name,
                    index_num:element.indicator.index_num,
                    children:element.children
                  })
                }
              }
            })
          }
        }
      })
    }
    this.http.getRequest('/indicator_sets/' + this.indicator_id + '/indicators').then((response:any) => {
      // if(response && response.length > 0){
      //   response.forEach(element => {
      //     // 匹配符合传过来的维度id的指标，给维度名称赋值
      //     if(this.index_id && element.id === this.index_id){
      //       this.index_name = element.index_num + " " + element.index_name;
      //     }

      //     // 匹配符合传过来的要点id的指标，给要点名称赋值
      //     if(this.point_id && element.id === this.point_id){
      //       this.point_name = element.index_num + " " + element.index_name;
      //       // this.http.getRequest('/indicators/' + this.point_id).then((response:any) => {
      //       //   if(response){
      //       //     this.point_detail = response;
      //       //   }
      //       // })
      //     }
      //   })
      // }
    })
  }

  // 切换级别
  // changeLevel(e){
  //   this.selectedLevel = e.target.value;
  // }

}
