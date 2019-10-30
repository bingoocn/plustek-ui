import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-sub-group-business-unit',
  templateUrl: './sub-group-business-unit.component.html',
  styleUrls: ['./sub-group-business-unit.component.scss'],
})
export class SubGroupBusinessUnitComponent implements OnInit {
  public noticeOpts : any = {
    effect: 'flip', 
    speed: 400, 
    loop:true, 
    autoplay: { delay: 2000 }, 
    direction:'vertical'
  }
  public businessNotices = [];
  public selfAccess :any = {
    accessedNum:0,
    heighLevel:'',
    heighLevel_code:'',
    lowLevel:'',
    lowLevel_code:'',
    heighsum:0,
    lowsum:0
  };
  public selfCheck :any = {
    checkedNum:'35',
    heighLevel:'三级',
    lowLevel:'五级',
    heighsum:'30',
    lowsum:'23'
  };
  constructor( public http:HttpService) { }

  ngOnInit() {
    this.getData();
    this.getBusinessAssess();
  }
  // 获取企业自评数据
  getBusinessAssess(){
    this.http.getRequest('/specification_evaluations').then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.accessedNum = response.length;
      }
    });
    //统计最高达级信息
    this.http.getRequest('/specification_evaluations?sort=-evaluation_level_code').then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.heighLevel = response[0].evaluation_level.name;
        this.selfAccess.heighLevel_code = response[0].evaluation_level.code;
        this.http.getRequest('/specification_evaluations?evaluation_level_code='+this.selfAccess.heighLevel_code).then((response:any) => {
          if(response && response.length > 0){
            this.selfAccess.heighsum = response.length;
          }
        });
      }
    });
    //统计最低达级信息
    this.http.getRequest('/specification_evaluations?sort=evaluation_level_code').then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.lowLevel = response[0].evaluation_level.name;
        this.selfAccess.lowLevel_code = response[0].evaluation_level.code;
        this.http.getRequest('/specification_evaluations?evaluation_level_code='+this.selfAccess.lowLevel_code).then((response:any) => {
          if(response && response.length > 0){
            // console.log(response)
            this.selfAccess.lowsum = response.length;
          }
        });
      }
    });
  }
  // 发送请求获取数据
  getData(){
    this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
      if(response && response.length > 0){
        this.businessNotices = response;
      }
    });
  }
}
