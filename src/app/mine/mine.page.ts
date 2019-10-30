import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  constructor(private el: ElementRef, public nav: NavController, public http:HttpService) { }

  ngOnInit() {
    this.http.getUser().then((response:any) => {
      console.log(response);
    });
    // 通过延时操作更改shadow dom的样式
    setTimeout(() => {
      const toolbar = this.el.nativeElement.querySelectorAll('ion-item');
      for(let i=0; i<toolbar.length; i++) {
        toolbar[i].shadowRoot.querySelector('.item-inner').style.borderBottomColor = '#eeeeee';
      }
    }, 1000);
  }
  // 退出登录
  logout() {
    window.localStorage.removeItem('token');
    this.nav.navigateBack(['login']);
  }

}
