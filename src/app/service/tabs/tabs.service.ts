import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  constructor(private router: Router,private platform: Platform) { 
    this.platform.ready().then(() => {
      this.navEvents();
    })
  }

  private navEvents(){
    console.log(this.router);
    console.log(this.router.events.pipe());
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
    console.log(e);
    this.showHideTabs(e);
    });
  }

  private showHideTabs(e: any){
    // 将url拆分为一个数组
    const urlArray = e.url.split('/');
    // 获取parentUrl
    const pageUrlParent = urlArray[urlArray.length - 2];
    // 获取最后一个页面url
    const pageUrl = urlArray[urlArray.length - 1];
    let page = pageUrl.split('?')[0];
    if(page == '' || page === 'login'){
      return
    }
    if(page === 'index' || page === 'notice' || page === 'workbench' || page === 'mine'){
      this.showTabs();
    }else{
      this.hideTabs();
    }
  }

  public hideTabs(){
    const tabBar = document.getElementById('myTabBar');
    if(tabBar.style.display !== 'none'){
      tabBar.style.display = 'none';
    }
  }

  public showTabs(){
    const tabBar = document.getElementById('myTabBar');
    if(tabBar.style.display !== 'flex'){
      tabBar.style.display = 'flex';
    }
  }
}
