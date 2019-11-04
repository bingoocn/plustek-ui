import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-sub-group-leader',
  templateUrl: './sub-group-leader.component.html',
  styleUrls: ['./sub-group-leader.component.scss'],
})
export class SubGroupLeaderComponent implements OnInit {
  public noticeOpts : any = {
    effect: 'flip', 
    speed: 400, 
    loop:false, 
    autoplay: { delay: 2000 }, 
    direction:'vertical'
  }
  public leaderNotices = [];
  public selfAccess :any = {
    accessedNum:0,
    heighLevel:'',
    lowLevel:'',
    heighsum:0,
    lowsum:0
  };
  public expertAssess :any = {
    checkedNum:0,
    heighLevel:'',
    lowLevel:'',
    heighsum:0,
    lowsum:0
  };
  public selfCheck :any = {
    checkedNum:0,
    heighLevel:'',
    lowLevel:'',
    heighsum:0,
    lowsum:0
  };
  public myWork :any = {
    unAssess:0,
    assessed:0
  }

  constructor( public http:HttpService,public common: CommonService) { }

  ngOnInit() {
    this.getData();
    this.getSelfAssess();
    this.getExpertAssess();
    // this.getMyWork();
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
  // getMyWork(){
  //   this.http.getRequest('/specification_mon_evaluations').then((response:any) => {
  //     if(response && response.length > 0){
  //       let contentArr = [];
  //       let a = []
  //       for(let i=0;i<response.length;i++){
  //         if(response[i].ent_self_eva_mon_approvals.length > 0){
  //           for(let n=0;n<response[i].ent_self_eva_mon_approvals.length;n++){
  //             if(response[i].ent_self_eva_mon_approvals[n].mon_approval_content !== ''){
  //               contentArr.push(response[i].ent_self_eva_mon_approvals[n])
  //             }
  //           }
  //         }
  //       }
  //       this.myWork.assessed = contentArr.length;
  //       this.myWork.unAssess = (response.length)*2 - contentArr.length;
  //     }
  //   })
  // }
  // 发送请求获取数据
  getData(){
    this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
      if(response && response.length > 0){
        this.leaderNotices = response;
      }
    });
  }
}
