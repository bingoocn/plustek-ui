import {Component, ElementRef, OnInit} from '@angular/core';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.page.html',
  styleUrls: ['./workbench.page.scss'],
})
export class WorkbenchPage implements OnInit {
  readonly menus:any = JSON.parse(localStorage.getItem("menu"));
  public workbench:any = [];
  public learn:any = [];
  public evaluation:any = [];
  public examination:any = [];

  constructor(
    private el: ElementRef,
    public fn: CommonService,
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
    this.workbench = this.fn.forma2Tree(this.menus, 'superiorMenuId', 'guid');
    // 学习交流
    this.learn = this.workbench[2]['children'][0]['children'];
    // 规范评价
    this.evaluation = this.workbench[2]['children'][1]['children'];
    // 评价考核
    this.examination = this.workbench[2]['children'][2]['children'];
    localStorage.setItem("a", JSON.stringify(this.workbench))
  }
}
