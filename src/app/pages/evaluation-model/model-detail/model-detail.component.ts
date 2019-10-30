import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss'],
})
export class ModelDetailComponent implements OnInit {

  public indicator_id:string; // 传过来的规范评价id
  public indicator_name:string; // 规范评价名称
  public index_id:string; // 传过来的维度id
  public index_name:string; // 维度名称
  public point_id:string; // 传过来的要点id
  public point_name:string; // 要点名称
  public topic_detail:any; // 题目详情
  public levels:any = [];
  public selectedLevel:string = 'level01'; // 默认选中一级
  compareWwithFn = (o1, o2) => {
    return o1 && o2 ? o1.value === o2.value : o1 === o2;
  };

  constructor(public routeInfo:ActivatedRoute, public router: Router, public http:HttpService) { }

  ngOnInit() {
    this.levels = [
      {
        label:'一级',
        value:'level01'
      },{
        label:'二级',
        value:'level02'
      },{
        label:'三级',
        value:'level03'
      },{
        label:'四级',
        value:'level04'
      },{
        label:'五级',
        value:'level05'
      }
    ];
    // 获取数据字典中的级别
    // this.http.getRequest('/trees/data_dictionary' + '级别' + '/jy_jb').then((response:any) => {

    // })
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
          if(response.year){
            this.indicator_name = response.year + '年' + response.index_name;
          }else{
            this.indicator_name = response.index_name;
          }
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
            // this.http.getRequest('/indicators/' + this.point_id).then((response:any) => {
            //   if(response){
            //     this.point_detail = response;
            //   }
            // })
          }
        })
      }
    })
  }

}
