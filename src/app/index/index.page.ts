import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http/http.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  public flag:any = [];

  // 当前所具备菜单数据
  public menus:any = JSON.parse(localStorage.getItem("menu"));
  // 首页比对数据
  readonly munuCode:any = [
    { name: 'business', code: '0' },
    { name: 'business-leader', code: '1' },
    { name: 'group', code: '2' },
    { name: 'group-leader', code: '3' },
    { name: 'expert', code: '4' },
    { name: 'sub-group-leader', code: '5' },
    { name: 'sub-group-business-unit', code: '6' },
  ]

  constructor(
    public route:ActivatedRoute,
    public http: HttpService,
    public nav: NavController
  ) { }

  ngOnInit() { 
    const menus = JSON.parse(localStorage.getItem("menu"));
    for(let i=0; i<this.munuCode.length; i++) {
      for(let k=0; k<menus.length; k++) {
        if(menus[k].menuUrl == this.munuCode[i].name) {
          this.flag.push(this.munuCode[i].code);
        }
      }
    }
  }
}
