import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-overall-evaluation',
  templateUrl: './overall-evaluation.page.html',
  styleUrls: ['./overall-evaluation.page.scss'],
})
export class OverallEvaluationPage implements OnInit {
  public evaluationValue:any = [];
  
  constructor(public http:HttpService) { }

  ngOnInit() {
    this.getData();
  }
  // 发送请求获取数据
  getData(){
    this.http.getRequest('/evaluation_results').then((response:any) => {
      if(response && response.length > 0){
        this.evaluationValue = response;
      }
    });
  }
}
