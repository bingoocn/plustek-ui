import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss'],
})
export class NoticeDetailComponent implements OnInit {

  public noticeId:string;
  public notice: any;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService, public common:CommonService) { 

  }
    
  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.noticeId = params['noticeId']);
    if(this.noticeId){
      this.http.getRequest('/notices/' + this.noticeId).then((response:any) => {
        if(response) {
          if(response.attachment && response.attachment.size){
            response.attachment.size = this.common.getFileSize(response.attachment.size);
          }
          this.notice = response;
        }
      })
    }
  }
}
