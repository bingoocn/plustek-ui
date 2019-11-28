import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-monitor-evaluation',
  templateUrl: './monitor-evaluation.page.html',
  styleUrls: ['./monitor-evaluation.page.scss'],
})
export class MonitorEvaluationPage implements OnInit {

  public evaluationTabValue: string = 'notEvaluated';//当前tab值
  public noEvaluations: any = [];//未评价
  public evaluations: any = [];//已评价
  public role: any = [];//当前登录人的当前角色

  constructor(public common: CommonService ,public routeInfo:ActivatedRoute ,private router: Router, public http:HttpService) { 
    this.common.eventEmit.on('getData',(result)=>{
      this.evaluationTabValue = 'alreadyEvaluated';
      const params = { evaluation_status_code: '05',evaluation_level_code: '',sort:'-evaluation_date' };
      this.getData(params);
    })
  }

  ngOnInit() {
    // 获取传递过来的状态（已评价，未评价）
    const evaluation_state = this.routeInfo.snapshot.queryParams['evaluation_state'];
    if(evaluation_state == '未评价'){
      this.evaluationTabValue = 'notEvaluated';
    }
    if(evaluation_state == '已评价'){
      this.evaluationTabValue = 'alreadyEvaluated';
    }
    const params = { evaluation_status_code: '05',evaluation_level_code: '',sort:'-evaluation_date' };
    this.getData(params);
  }
  
  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/specification_mon_evaluations', params).then((response:any) => {
      this.evaluations = [];
      this.noEvaluations = [];
      if(response && response.length > 0){
        // 遍历每条数据，区分当前登录人当前角色未评价、已评价
        response.forEach(element => {
          if(element.id){
            // 从session里获取当前登录人的当前角色信息
            const currentRole = JSON.parse(localStorage.getItem('currentRole'));
            if(currentRole && currentRole.guid){
              // 获取系统运行参数表查找与当前登录人当前角色id相匹配的信息
              const params = {param_name:currentRole.guid};
              this.http.getRequest('/sys_param',params).then((response:any) => {
                if(response && response.param_value){
                  this.role = JSON.parse(response.param_value);
                  if(this.role.abbreviation){
                    var monitor = '';
                    if(this.role.abbreviation === 'JTYWBM'){
                      monitor = '/top_group_monitor'
                    }
                    if(this.role.abbreviation === 'ZJTYWBM'){
                      monitor = '/sub_group_monitor'
                    }
                    if(monitor !== ''){
                      this.http.getRequest('/specification_evaluations/' + element.id + monitor).then((response:any) => {
                        if(response && response.mon_approval_content){
                          this.evaluations.push(element);
                        }else{
                          this.noEvaluations.push(element);
                        }
                      })
                    }
                  }
                }
              })
            }
          }
        });
      }
    });
  }

  // tab切换事件
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
