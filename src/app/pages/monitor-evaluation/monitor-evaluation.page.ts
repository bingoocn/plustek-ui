import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-monitor-evaluation',
  templateUrl: './monitor-evaluation.page.html',
  styleUrls: ['./monitor-evaluation.page.scss'],
})
export class MonitorEvaluationPage implements OnInit {

  public evaluationTabValue: string;
  public noEvaluations: any = [];
  public evaluations: any = [];

  constructor(public http:HttpService) { }

  ngOnInit() {
    const params = { evaluation_level_code: '' };
    this.getData(params);
    this.evaluationTabValue = 'notEvaluated';
    // this.noEvaluations =[
    //   {
    //     id:'01',
    //     unit:{
    //       group:{
    //         name:'中国北方公司'
    //       },
    //       name:'中国万宝过程公司'
    //     },
    //     subordinate_plate:'所属板块一',
    //     questionnaire:{
    //       evaluation_level:{
    //         name:'一级'
    //       }
    //     },
    //     self_score:80,
    //     evaluation_date:'2019-10-20'
    //   },{
    //     id:'02',
    //     unit:{
    //       group:{
    //         name:'中国北方公司'
    //       },
    //       name:'中国万宝过程公司'
    //     },
    //     subordinate_plate:'所属板块一',
    //     questionnaire:{
    //       evaluation_level:{
    //         name:'一级'
    //       }
    //     },
    //     self_score:80,
    //     evaluation_date:'2019-10-20'
    //   }
    // ];
    // this.evaluations =[
    //   {
    //     id:'03',
    //     unit:{
    //       group:{
    //         name:'中国北方公司1'
    //       },
    //       name:'中国万宝过程公司1'
    //     },
    //     subordinate_plate:'所属板块二',
    //     questionnaire:{
    //       evaluation_level:{
    //         name:'二级'
    //       }
    //     },
    //     self_score:80,
    //     evaluation_date:'2019-10-20'
    //   }
    // ]
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/specification_mon_evaluations', params).then((response:any) => {
      if(response && response.length > 0){
        this.noEvaluations = response;
      }
    });
  }

  // tab切换事件
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
