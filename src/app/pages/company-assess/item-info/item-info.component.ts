import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss'],
})
export class ItemInfoComponent implements OnInit {
  public indicatorId: string;
  public indexId: String;
  public form: any = [];
  public questId: string; //问卷的ID
  public items: array = []; //试卷列表
  public slideOpts:any = {
    effect: 'flip', 
    speed: 400, 
    loop:false, 
    autoplay: { delay: 2000 }, 
    pager: false
  }

  constructor(public routeInfo: ActivatedRoute, public http: HttpService, private router: Router, public common: CommonService, ) { }

  ngOnInit() {
    // 获取传递过来的规范评价id
    this.routeInfo.queryParams.subscribe((data) => {this.questId = data.questId, this.indicatorId = data.indicatorId; this.indexId = data.indexId});
    const params = { indicator_pid: this.indexId, index_level_type_code: '03'};
    // const params2 = { indicator_id: this.indexId, index_level_type_code: '03'};
    this.getIndicator(params);
    this.form = [
      {
        isChecked: true,
        content: 'sdawrqrqrsd'
      },
      {
        isChecked: true,
        content: 'sdawrqrqrsd'
      }, {
        isChecked: true,
        content: 'sdawrqrqrsd'
      }
    ]
  }

  // 获取当前使用的《规范》评价指标及其下的第一层维度
  getIndicator(params) {
    this.http.getRequest(`/indicator_sets/${this.indicatorId}/indicators`,params).then((response: any) => {
      if (response && response.length > 0) {
        let res = response;
        console.log(response, '结果是不是想要的值')
        res.forEach((e,i)=>{
          this.http.getRequest(`/questionnaires/${this.questId}/topics?indicator_id=`+e.id).then((response: any)=>{
            console.log(response[0],'asdfafafaf')
            if(response && response.length > 0){
              this.items.push(response[0])
            }
          })
        })
        


        // this.indicator_id = response[0].id;
        // if (response[0].index_name) {
        //   if (response[0].year) {
        //     this.indicator_name = response[0].index_name;
        //   } else {
        //     this.indicator_name = response[0].index_name;
        //   }
        // }
        // if (response[0].id) {
        //   this.http.getRequest('/indicator_sets/' + response[0].id + '/indicators').then(( response: any) => {
        //     if (response && response.length > 0) {
        //       this.indexes = this.common.forma2Tree(response, 'pid', 'id');
        //     }
        //   })
        // }
      }
    })
  }

}
