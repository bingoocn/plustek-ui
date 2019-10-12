import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// 引入封装的axios服务
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController, private router: Router, public axios:HttpService) { }

  ngOnInit() {
  }
  login() {
    window.localStorage.setItem("token", '1');
    this.router.navigate(['']);
  }
}
