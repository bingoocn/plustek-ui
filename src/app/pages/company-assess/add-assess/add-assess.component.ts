import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-add-assess',
  templateUrl: './add-assess.component.html',
  styleUrls: ['./add-assess.component.scss'],
})
export class AddAssessComponent implements OnInit {

  public subordinatePlate: string;
  public evaluationDate: string;
  public evaluationLevelCode: string;

  constructor(public routeInfo: ActivatedRoute, private router: Router, public http:HttpService) { }

  ngOnInit() {
    // console.log(this.evaluationLevelCode,'日期',

  }

  handleLastNameValue(event) {
    console.log(event);
  }
  processForm(event) {}



}
