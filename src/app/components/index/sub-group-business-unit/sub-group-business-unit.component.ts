import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-sub-group-business-unit',
  templateUrl: './sub-group-business-unit.component.html',
  styleUrls: ['./sub-group-business-unit.component.scss'],
})
export class SubGroupBusinessUnitComponent implements OnInit {
  //当前登录人单位Id
  public unitId: string;
  public role: any;
  public noticeOpts : any = {
    effect: 'flip', 
    speed: 400, 
    loop:false, 
    autoplay: { delay: 2000 }, 
    direction:'vertical'
  }
  public businessNotices = [];
  public selfAccess :any = {
    accessedNum:0,
    heighLevel:'暂无',
    heighLevel_code:'',
    lowLevel:'暂无',
    lowLevel_code:'',
    heighsum:0,
    lowsum:0
  };
  //专家检查信息
  public expertAssess :any = {
    checkedNum:0,
    heighLevel:'暂无',
    lowLevel:'暂无',
    heighsum:0,
    lowsum:0
  };
  public myWork: any = {
    unAssess:0,
    assessed:0,
  }
  constructor( public http:HttpService,public common: CommonService) { }

  ngOnInit() {
    this.unitId = window.localStorage.getItem("unitId");
    this.getData();
    this.getMyWork();
    this.getSelfAssess();
    this.getExpertAssess();
  }
  // 获取企业自评数据
  getSelfAssess(){
    this.http.getRequest('/specification_evaluations?evaluation_status_code=05&apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        let resArr = response;
        let unitArr = resArr.reduce(function(prev,element){
          if(!prev.find(el=>el.unit.id==element.unit.id)) {
            prev.push(element)
          }
          return prev
        },[])
        this.selfAccess.accessedNum = unitArr.length;
      }
    });
    //统计最高达级信息
    this.http.getRequest('/specification_evaluations?evaluation_status_code=05&sort=-evaluation_level_code&apply_id='+ this.unitId).then((response:any) => {
      if(response && response.length > 0){
        this.selfAccess.heighLevel = response[0].evaluation_level.name;
        if(response[0].evaluation_level.name == ''){
          this.selfAccess.heighsum = 0;
        }else{
          this.selfAccess.heighLevel_code = response[0].evaluation_level.code;
          this.http.getRequest('/specification_evaluations?evaluation_status_code=05&evaluation_level_code='+this.selfAccess.heighLevel_code+'&apply_id='+ this.unitId).then((response:any) => {
            if(response && response.length > 0){
              let  heighsumArr = response.reduce(function(prev,element){
                if(!prev.find(el=>el.unit.id==element.unit.id)) {
                  prev.push(element)
                }
                return prev
              },[])
              this.selfAccess.heighsum = heighsumArr.length;
              //统计最低达级信息
              this.http.getRequest('/specification_evaluations?evaluation_status_code=05&sort=evaluation_level_code&apply_id='+ this.unitId).then((response:any) => {
                response = response.filter( item => item.evaluation_level.name !== '')
                if(response && response.length > 0){
                  if(response[0].evaluation_level.name == ''){
                    this.selfAccess.lowsum = 0;
                  }else{
                    if(this.selfAccess.heighLevel !== '一级'){
                      this.selfAccess.lowLevel = response[0].evaluation_level.name;
                    }
                    this.selfAccess.lowLevel_code = response[0].evaluation_level.code;
                    this.http.getRequest('/specification_evaluations?evaluation_level_code='+this.selfAccess.lowLevel_code).then((response:any) => {
                      if(response && response.length > 0){
                        let  lowsumArr = response.reduce(function(prev,element){
                          if(!prev.find(el=>el.unit.id==element.unit.id)) {
                            prev.push(element)
                          }
                          return prev
                        },[])
                        if(lowsumArr.length == 1 && lowsumArr[0].evaluation_level.name !== '一级'){
                          this.selfAccess.lowsum = lowsumArr.length;
                        }
                      }
                    });
                  }
                }
              });
            }
          });
        }
      }
    });
  }
  //获取专家检查数据
  getExpertAssess() {
    this.http.getRequest('/expert_reviews?sort=-check_end_time&apply_id'+ this.unitId).then((response:any) => {
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
          //获取最高/低达级单位数量
          if(standard_Level.length > 0){
            //最低达级和最高达级都为一级时
            if(Math.min(...standard_Level) !== 0){
              this.expertAssess.lowLevel = Math.min(...standard_Level);
              this.expertAssess.lowsum = this.common.countNum(standard_Level,this.expertAssess.lowLevel)
              this.expertAssess.lowLevel = this.common.convertToChinaNum(Math.min(...standard_Level))+'级'
            }
            this.expertAssess.heighLevel = Math.max(...standard_Level)
            this.expertAssess.heighsum = this.common.countNum(standard_Level,this.expertAssess.heighLevel)
            this.expertAssess.heighLevel = this.common.convertToChinaNum(Math.max(...standard_Level))+'级'
          }
        }
      }
    });
  }
  getMyWork(){
    this.http.getRequest('/specification_mon_evaluations').then((response:any) => {
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
                        if(response == null){
                          this.myWork.unAssess ++
                        }else{
                          this.myWork.assessed ++
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
  // 发送请求获取数据
  getData(){
    this.http.getRequest('/notices?publish_status_code=02').then((response:any) => {
      if(response && response.length > 0){
        this.businessNotices = response;
      }
    });
  }
}
