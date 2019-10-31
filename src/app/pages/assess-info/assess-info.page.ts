import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-assess-info',
  templateUrl: './assess-info.page.html',
  styleUrls: ['./assess-info.page.scss'],
})
export class AssessInfoPage implements OnInit {
  public assessId: string;
  public assessInfo: any;

  constructor(public routeInfo: ActivatedRoute, private router: Router, public http: HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.assessId = params['assessId']);
    if (this.assessId) {
      // 查询企业自评
      this.http.getRequest('/specification_evaluations/' + this.assessId).then((response: any) => {
        if (response) {
          this.assessInfo = response;
        }
      });
    }
  }

}
