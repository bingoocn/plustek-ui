import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-internal-communication',
  templateUrl: './internal-communication.page.html',
  styleUrls: ['./internal-communication.page.scss'],
})
export class InternalCommunicationPage implements OnInit {

  public topics:any = [];
  public title:any;

  constructor(public route:ActivatedRoute, public http:HttpService) { 
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe((data)=>{ 
      this.title = data.title;
    });

    const params = { exchange_proceeding:'',publish_status_code: '02' };
    this.getData(params);

  }

  // 关键字搜索
  getTopics(ev: any) {
    const params = { exchange_proceeding:ev.target.value,publish_status_code: '02' };
    this.getData(params);
  }

  // 发送请求获取数据
  getData(params:any){
    this.http.getRequest('/communions', params).then((response:any) => {
      if(response && response.length > 0){
        this.topics = response;
      }
    });
  }
}
