import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { HttpService } from './service/http/http.service';
import { TabsService } from './service/tabs/tabs.service';

import { NgxEchartsModule } from 'ngx-echarts'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    // tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
    backButtonText: '', /*配置返回按钮*/
    backButtonIcon: 'ios-arrow-back-outline',//统一返回按钮图标
    mode: 'ios' /*配置android ios使用一套样式*/
  }), AppRoutingModule, HttpClientModule,NgxEchartsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // 启用http拦截器
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    LoginGuardGuard,
    HttpService,
    TabsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
