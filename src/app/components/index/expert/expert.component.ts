import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

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
  //企业自评信息
  public selfAccess :any = {
    accessedNum:0,
    heighLevel:'',
    heighLevel_code:'',
    lowLevel:'',
    lowLevel_code:'',
    heighsum:0,
    lowsum:0
  };
  //专家检查信息
  public expertAssess :any = {
    checkedNum:0,
    heighLevel:'',
    lowLevel:'',
    heighsum:0,
    lowsum:0
  };
 
  constructor( public http:HttpService,public common: CommonService) { }

  ngOnInit() {
    this.getNotice();
    this.getSelfAssess();
    this.getExpertAssess();
  }
  // 获取企业自评数据
  getSelfAssess(){
    this.http.getRequest('/specification_evaluations').then((response:any) => {
      if(response && response.length > 0){
        let accessArr = [];
        response.forEach( item=>{
          if(item.evaluation_level && item.evaluation_level.name !== ''){
            accessArr.push(item);
            this.selfAccess.accessedNum = accessArr.length;
          }
        })
      }
    });
    //统计最高达级信息
    this.http.getRequest('/specification_evaluations?sort=-evaluation_level_code').then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.heighLevel = response[0].evaluation_level.name;
        if(response[0].evaluation_level.name == ''){
          this.selfAccess.heighsum = 0;
        }else{
          this.selfAccess.heighLevel_code = response[0].evaluation_level.code;
          this.http.getRequest('/specification_evaluations?evaluation_level_code='+this.selfAccess.heighLevel_code).then((response:any) => {
            if(response && response.length > 0){
              this.selfAccess.heighsum = response.length;
            }
          });
        }
      }
    });
    //统计最低达级信息
    this.http.getRequest('/specification_evaluations?sort=evaluation_level_code').then((response:any) => {
      response = response.filter( item => item.evaluation_level.name !== '')
      if(response && response.length > 0){
        this.selfAccess.lowLevel = response[0].evaluation_level.name;
        if(response[0].evaluation_level.name == ''){
          this.selfAccess.lowsum = 0;
        }else{
          this.selfAccess.lowLevel_code = response[0].evaluation_level.code;
          this.http.getRequest('/specification_evaluations?evaluation_level_code='+this.selfAccess.lowLevel_code).then((response:any) => {
            if(response && response.length > 0){
              this.selfAccess.lowsum = response.length;
            }
          });
        }
      }
    });
  }
  //获取专家检查数据
  getExpertAssess() {
    this.http.getRequest('/expert_reviews?sort=-check_end_time').then((response:any) => {
      if(response && response.length > 0){
        //根据单位去重
        let resArr = response;
        let unitArr = [];
        let standard_Level = [];
        let unitLevelArr = [];

        unitArr = resArr.reduce(function(prev,element){
          if(!prev.find(el=>el.unit.id==element.unit.id)) {
            prev.push(element)
          }
          return prev
        },[])
        this.expertAssess.checkedNum = unitArr.length;
        //获取最高/低达级
        response.forEach(item => {
          if(item.evaluation_result.standard_result !== null){
            standard_Level.push(Number(item.evaluation_result.standard_result.code));
          }
        });
        //获取最高/低达级单位数量
        if(standard_Level.length > 0){
          let newstandard_Level = standard_Level.reduce(function(prev,element){
            if(!prev.find(el=>el==element)) {
              prev.push(element)
            }
            return prev
          },[])
          this.expertAssess.heighLevel = Math.max(...standard_Level)
          this.expertAssess.lowLevel = Math.min(...standard_Level)
          this.expertAssess.heighsum = this.common.countNum(newstandard_Level,this.expertAssess.heighLevel)
          this.expertAssess.lowsum = this.common.countNum(newstandard_Level,this.expertAssess.lowLevel)
          this.expertAssess.heighLevel = this.common.convertToChinaNum(Math.max(...standard_Level))
          this.expertAssess.lowLevel = this.common.convertToChinaNum(Math.min(...standard_Level))
        }
      }
    });
  }
  // 获取公告通知数据
  getNotice(){
    this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
      if(response && response.length > 0){
        this.expertNotices = response;
      }
    });
  }
}
