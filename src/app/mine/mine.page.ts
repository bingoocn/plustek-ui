import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  public user:any;

  constructor(private el: ElementRef, public nav: NavController, public http:HttpService) { }

  ngOnInit() {
    // 获取当前登录人信息以及当前角色信息
    this.http.getUser().then((response:any) => {
      if(response){
        this.user = response;
        if(this.user.guid){
          const role = JSON.parse(localStorage.getItem("currentRole"));
          this.user.currentRole = role.roleName;
        }
      }
    });
  }
  ngAfterViewInit(){
    // 通过延时操作更改shadow dom的样式
    setTimeout(() => {
      const toolbar = this.el.nativeElement.querySelectorAll('ion-item');
      for(let i=0; i<toolbar.length; i++) {
        toolbar[i].shadowRoot.querySelector('.item-inner').style.borderBottomColor = '#eeeeee';
      }
    }, 500);
  }
  // 退出登录
  logout() {
    window.localStorage.removeItem('token');
    this.nav.navigateBack(['login']);
  }

}
