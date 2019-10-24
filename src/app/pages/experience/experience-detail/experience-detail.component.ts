import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.scss'],
})
export class ExperienceDetailComponent implements OnInit {

  public experienceId:string;
  public experience:any;

  constructor(public routeInfo:ActivatedRoute,private router: Router, public http:HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.experienceId = params['experienceId']);
    if(this.experienceId){
      this.http.getRequest('/experiences/' + this.experienceId).then((response:any) => {
        if(response) {
          this.experience = response;
        }
      })
    }
  }

}
