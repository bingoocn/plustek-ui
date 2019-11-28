import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.scss'],
})
export class ExperienceDetailComponent implements OnInit {

  public experienceId:string;
  public experience:any;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService, public common:CommonService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.experienceId = params['experienceId']);
    if(this.experienceId){
      this.http.getRequest('/experiences/' + this.experienceId).then((response:any) => {
        if(response) {
          this.experience = response;
          if(this.experience.attachments && this.experience.attachments.length > 0){
            this.experience.attachments.forEach(element => {
              if(element.size){
                element.size = this.common.getFileSize(element.size);
              }
            })
          }
        }
      })
    }
  }

  //下载附件
  download(id:any){
    if(id){
      window.location.href = this.http.baseIp + "/attachment/" + id;
    }else{
      this.http.presentToast('下载失败！', 'bottom');
    }
  }

}
