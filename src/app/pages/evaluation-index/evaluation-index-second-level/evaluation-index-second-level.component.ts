import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-evaluation-index-second-level',
  templateUrl: './evaluation-index-second-level.component.html',
  styleUrls: ['./evaluation-index-second-level.component.scss'],
})
export class EvaluationIndexSecondLevelComponent implements OnInit {

  public indicator_id:string; // 传过来的规范评价id
  public indicator_name:string; // 规范评价名称
  public index_id:string; // 传过来的维度id
  public index_name:string; // 维度名称
  public indexes:any = []; // 要项、要点集合

  constructor(public routeInfo:ActivatedRoute, public router: Router, public http:HttpService) { }

  ngOnInit() {
    // 获取传递过来的规范评价id
    this.routeInfo.queryParams.subscribe((data)=>{ 
      this.indicator_id = data.indicatorId;
    });
    if(this.indicator_id){
      this.http.getRequest('/indicator_sets/' + this.indicator_id).then((response:any) => {
        if(response && response.index_name){
          if(response.year){
            this.indicator_name = response.year + '年' + response.index_name;
          }else{
            this.indicator_name = response.index_name;
          }
        }
      })
    }
    // 获取路由传递过来的维度id
    this.routeInfo.params.subscribe((params: Params) => this.index_id = params['indexId']);
    if(this.index_id){
      this.http.getRequest('/indicator_sets/' + this.indicator_id + '/indicators').then((response:any) => {
        if(response && response.length > 0){
          this.indexes = [];
          response.forEach(element => {
            // 匹配符合传过来的维度id的指标，给维度名称赋值
            if(element.id === this.index_id){
              this.index_name = element.index_num + " " + element.index_name;
            }
            // 获取维度和要项、要点
            if(element.pid === this.index_id){
              // 再次循环数组，找到当前节点的children
              response.forEach(item => {
                if(item.pid == element.id){
                  if(element["children"]){
                    element["children"].push({
                      id:item.id,
                      index_name:item.index_name,
                      index_num:item.index_num
                    })
                  }else{
                    element["children"] = [];
                    element["children"].push({
                      id:item.id,
                      index_name:item.index_name,
                      index_num:item.index_num
                    })
                  }
                }
              })
              this.indexes.push({
                id:element.id,
                index_name:element.index_name,
                index_num:element.index_num,
                children:element.children
              });
            }
          });
        }
      })
    }
  }

}
