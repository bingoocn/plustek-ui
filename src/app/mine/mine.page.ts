import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  readonly menus:any = JSON.parse(localStorage.getItem("menu"));
  public mine:any = [];
  public myMenus:any = [];
  public user:any;
  public role_abbr:string;

  constructor(private el: ElementRef, public nav: NavController, public http:HttpService,public fn: CommonService) { }

  ngOnInit() {
    // 获取当前登录人信息以及当前角色信息
    this.http.getUser().then((response:any) => {
      if(response){
        this.user = response;
        if(this.user.guid){
          const role = JSON.parse(localStorage.getItem("currentRole"));
          this.user.currentRole = role.roleName;
          if(role && role.guid){
            // 获取系统运行参数表查找与当前登录人当前角色id相匹配的信息
            const params = {param_name:role.guid};
            this.http.getRequest('/sys_param',params).then((response:any) => {
              if(response && response.param_value){
                var paramValue = JSON.parse(response.param_value);
                if(paramValue.abbreviation){
                  this.role_abbr = paramValue.abbreviation;
                }
              }
            })
          }
        }
      }
    });

    // 处理我的菜单数据
    this.mine = this.fn.forma2Tree(this.menus, 'superiorMenuId', 'guid');
    if(this.mine && this.mine[3] && this.mine[3].children && this.mine[3].children.length > 0){
      this.myMenus = this.mine[3].children;
    }
  }
  ngAfterViewInit(){
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
