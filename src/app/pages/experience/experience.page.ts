import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.scss'],
})
export class ExperiencePage implements OnInit {

  public experiences:any = [];

  constructor(public router: Router, public http:HttpService) { }

  ngOnInit() {
    this.experiences = [];
    const params = { title:'',publish_status_code: '02' };
    this.http.getRequest('/experiences', params).then((response:any) => {
      if(response && response.length > 0){
        this.experiences = response;
      }
    })
  }

  // 关键字搜索
  getExperiences(ev: any) {
    this.ngOnInit();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.experiences = this.experiences.filter((item:any) => {
        return (item.title.indexOf(val) > -1);
      })
    }
  }
}
