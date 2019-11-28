import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss'],
})
export class PlanDetailComponent implements OnInit {

  public planId:string;
  public improvement:any;
  public planTabValue: string;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService, public common:CommonService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.planId = params['planId']);
    if(this.planId){
      this.http.getRequest('/improvements/' + this.planId).then((response:any) => {
        if(response) {
          this.improvement = response;
          if(this.improvement.attachments && this.improvement.attachments.length > 0){
            this.improvement.attachments.forEach(element => {
              if(element.size){
                element.size = this.common.getFileSize(element.size);
              }
            })
          }
        }
      })
    }
    this.planTabValue = 'improveContent';
  }

  //下载附件
  download(id:any){
    if(id){
      window.location.href = this.http.baseIp + "/attachment/" + id;
    }else{
      this.http.presentToast('下载失败！', 'bottom');
    }
  }

  // tab切换事件
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
