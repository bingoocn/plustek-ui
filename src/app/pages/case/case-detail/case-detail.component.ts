import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss'],
})
export class CaseDetailComponent implements OnInit {

  public caseId:string;
  public case:any;
  public caseTabValue: string;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService, public common:CommonService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.caseId = params['caseId']);
    if(this.caseId){
      this.http.getRequest('/cases/' + this.caseId).then((response:any) => {
        if(response) {
          this.case = response;
          if(this.case.attachments && this.case.attachments.length > 0){
            this.case.attachments.forEach(element => {
              if(element.size){
                element.size = this.common.getFileSize(element.size);
              }
            })
          }
        }
      })
    }
    this.caseTabValue = 'caseContent';
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
