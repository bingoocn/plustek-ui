import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-monitor-evaluation',
  templateUrl: './monitor-evaluation.page.html',
  styleUrls: ['./monitor-evaluation.page.scss'],
})
export class MonitorEvaluationPage implements OnInit {

  public evaluationTabValue: string;//当前tab值
  public noEvaluations: any = [];//未评价
  public evaluations: any = [];//已评价

  constructor(public http:HttpService) { }

  ngOnInit() {
    const params = { evaluation_level_code: '',sort:'-evaluation_date' };
    this.getData(params);
    this.evaluationTabValue = 'notEvaluated';// 默认显示未评价列表
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/specification_mon_evaluations', params).then((response:any) => {
      if(response && response.length > 0){
        // 遍历每条数据，区分未评价、已评价
        response.forEach(element => {
          if(element.id){
            this.http.getRequest('/specification_evaluations/' + element.id + '/sub_group_monitor').then((response:any) => {
              if(response && response.mon_approval_content){
                this.evaluations.push(element);
              }else{
                this.http.getRequest('/specification_evaluations/' + element.id + '/top_group_monitor').then((response:any) => {
                  if(response && response.mon_approval_content){
                    this.evaluations.push(element);
                  }else{
                    this.noEvaluations.push(element);
                  }
                })
              }
            });
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
