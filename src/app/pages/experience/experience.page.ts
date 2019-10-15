import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.scss'],
})
export class ExperiencePage implements OnInit {

  public experiences:any = [];

  constructor(public router: Router) { }

  ngOnInit() {
    this.experiences = [
      {
        guid:'01',
        title:'关于企业改革的经验分享',
        shareTime:'2019-10-13',
        keyWords:'改革、经验'
      },{
        guid:'02',
        title:'关于企业自评的经验分享',
        shareTime:'2019-10-12',
        keyWords:'自评、经验'
      },{
        guid:'02',
        title:'关于提高国民经济的经验分享',
        shareTime:'2019-10-10',
        keyWords:'经济'
      }
    ];
  }

  // 关键字搜索
  getExperiences(ev: any) {
    this.ngOnInit();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.experiences = this.experiences.filter((item) => {
        return (item.title.indexOf(val) > -1);
      })
    }
  }
}
