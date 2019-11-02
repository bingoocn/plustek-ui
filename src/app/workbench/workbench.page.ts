import {Component, ElementRef, OnInit} from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';
import { CommonService } from 'src/app/service/common/common.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.page.html',
  styleUrls: ['./workbench.page.scss'],
})
export class WorkbenchPage implements OnInit {
  readonly menus:any = JSON.parse(localStorage.getItem("menu"));
  // 定义工作台各模块变量
  public workbench:any = [];
  public learn:any = [];
  public evaluation:any = [];
  public examination:any = [];

  constructor(
    private el: ElementRef,
    private nav: NavController, 
    public fn: CommonService,
    public http:HttpService
  ) {
　}

  ngOnInit() {
    // 通过延时操作更改shadow dom的样式
    setTimeout(() => {
      const toolbar = this.el.nativeElement.querySelectorAll('ion-tab-button');
      for(let i=0; i<toolbar.length; i++) {
        toolbar[i].shadowRoot.querySelector('a').style.padding = '0';
      }
    }, 1000);
    // 处理工作台菜单数据
    this.workbench = this.fn.forma2Tree(this.menus, 'superiorMenuId', 'guid');
     // 学习交流
     this.learn = this.workbench[2]['children'][0]['children'];
     // 规范评价
     this.evaluation = this.workbench[2]['children'][1]['children'];
    if(this.workbench[2]['children']['length'] == '3'){
      // 评价考核
      this.examination = this.workbench[2]['children'][2]['children'];
    }else{
      // 评价考核
      this.examination = [];
    }
  }
}
