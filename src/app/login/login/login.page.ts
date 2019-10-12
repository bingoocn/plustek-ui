import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }
  login() {
    window.localStorage.setItem("token", '1');
    console.log(this.nav)
    // this.nav.back();
    // this.nav.navigateForward('tabs');
    // this.nav.first();
    // this.nav.navigateRoot('notice');
    // this.nav.navigateByUrl('/index');
  }
}
