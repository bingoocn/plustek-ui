import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-index-detail',
  templateUrl: './index-detail.component.html',
  styleUrls: ['./index-detail.component.scss'],
})
export class IndexDetailComponent implements OnInit {

  public indicator_id:string; // 传过来的规范评价id
  public indicator_name:string; // 规范评价名称
  public index_id:string; // 传过来的维度id
  public index_name:string; // 维度名称
  public point_id:string; // 传过来的要点id
  public point_name:string; // 要点名称
  public point_detail:any; // 要点详情

  constructor(public routeInfo:ActivatedRoute, public router: Router, public http:HttpService) { }

  ngOnInit() {
    // 获取传递过来的规范评价id和维度id
    this.routeInfo.queryParams.subscribe((data)=>{ 
      this.indicator_id = data.indicatorId;
      this.index_id = data.indexId;
    });
    // 获取路由传递过来的要点id
    this.routeInfo.params.subscribe((params: Params) => this.point_id = params['indexId']);

    if(this.indicator_id){
      this.http.getRequest('/indicator_sets/' + this.indicator_id).then((response:any) => {
        if(response && response.index_name){
          this.indicator_name = response.index_name;
        }
      })
    }
    this.http.getRequest('/indicator_sets/' + this.indicator_id + '/indicators').then((response:any) => {
      if(response && response.length > 0){
        response.forEach(element => {
          // 匹配符合传过来的维度id的指标，给维度名称赋值
          if(this.index_id && element.id === this.index_id){
            this.index_name = element.index_num + " " + element.index_name;
          }

          // 匹配符合传过来的要点id的指标，给要点名称赋值
          if(this.point_id && element.id === this.point_id){
            this.point_name = element.index_num + " " + element.index_name;
            this.http.getRequest('/indicators/' + this.point_id).then((response:any) => {
              if(response){
                this.point_detail = response;
              }
            })
          }
        })
      }
    })
  }

}
