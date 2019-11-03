import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-mytopic',
  templateUrl: './mytopic.component.html',
  styleUrls: ['./mytopic.component.scss'],
})
export class MytopicComponent implements OnInit {

  public topics:any = [];
  public exchange_proceeding:string = '';
  public person_id:string = '';

  constructor(public route:ActivatedRoute, public http:HttpService) { }

  ngOnInit() {
    // 获取当前登录人信息
    this.http.getUser().then((response:any) => {
      if(response){
        if(response.guid){
          this.person_id = response.guid;
          const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',sort:'-publish_time',person_id:this.person_id };
          this.getData(params);
        }
      }
    })
  }

  // 关键字搜索
  getTopics(ev: any) {
    this.exchange_proceeding = ev.target.value;
    const params = { exchange_proceeding:this.exchange_proceeding,publish_status_code: '02',sort:'-publish_time',person_id:this.person_id };
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
