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
    this.filterIndex().then(res => {
      if(res['length']>1) {
        this.http.presentAlert('提示', '', '菜单配置有误，请联系管理员修改配置！');
        this.nav.navigateRoot("/login");
      }
    })
  }
  filterIndex() {
    return new Promise((resolve, reject) => {
      const menus = JSON.parse(localStorage.getItem("menu"));
      for(let i=0; i<this.munuCode.length; i++) {
        for(let k=0; k<menus.length; k++) {
          if(menus[k].menuUrl == this.munuCode[i].name) {
            this.flag.push(this.munuCode[i].code);
          }
        }
      }
      resolve(this.flag)
    })
  }
}
