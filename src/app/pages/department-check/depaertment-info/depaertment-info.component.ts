import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-depaertment-info',
  templateUrl: './depaertment-info.component.html',
  styleUrls: ['./depaertment-info.component.scss'],
})
export class DepaertmentInfoComponent implements OnInit {
  public companyId: string; // 企业自评id
  public assessInfo: any;
  public main_highlight: any; // 主要亮点
  public major_deficiency: any; // 主要不足
  public title: any;

  constructor(public nav: NavController, public routeInfo: ActivatedRoute, private router: Router, public http: HttpService) { }


  ngOnInit() {
    this.routeInfo.queryParams.subscribe((data) => { this.title = data.title, this.companyId = data.companyId });
    if (this.companyId) {
      // 查询企业自评
      this.http.getRequest('/specification_evaluations/' + this.companyId).then((response: any) => {
        if (response) {
          this.assessInfo = response;
          this.main_highlight = response.main_highlight;
          this.major_deficiency = response.major_deficiency;
        }
      });
    }
  }

  save() {
    const params = {
      id: this.companyId, // 自评ID
      main_highlight: this.main_highlight, // 主要亮点
      major_deficiency: this.major_deficiency, //主要不足
    };
    this.http.putRequest(`/specification_evaluations/${this.companyId}`, params).then((response: any) => {
      if (response) {
        this.nav.navigateForward("/company-assess")
      }
    })
  }
  toNext() { }

}
