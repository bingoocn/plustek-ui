import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http/http.service';
import { TabsService } from './service/tabs/tabs.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    // tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
    backButtonText: '', /*配置返回按钮*/
    backButtonIcon: 'ios-arrow-back-outline',//统一返回按钮图标
    mode: 'ios' /*配置android ios使用一套样式*/
  }), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginGuardGuard,
    HttpService,
    TabsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
