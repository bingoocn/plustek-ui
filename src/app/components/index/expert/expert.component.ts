import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
})
export class ExpertComponent implements OnInit {
  public noticeOpts : any = {
    effect: 'flip', 
    speed: 400, 
    loop:true, 
    autoplay: { delay: 2000 }, 
    direction:'vertical'
  }
  public expertNotices = [];
  public selfAccess :any = {
    accessedNum:'39',
    heighLevel:'二级',
    lowLevel:'四级',
    heighsum:'20',
    lowsum:'12'
  };
  public expertAssess :any = {
    checkedNum:'35',
    heighLevel:'三级',
    lowLevel:'五级',
    heighsum:'30',
    lowsum:'23'
  };
 
  constructor( public http:HttpService) { }

  ngOnInit() {
    this.getData();
  }
  // 发送请求获取数据
  getData(){
    this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
      if(response && response.length > 0){
        this.expertNotices = response;
      }
    });
  }
}
