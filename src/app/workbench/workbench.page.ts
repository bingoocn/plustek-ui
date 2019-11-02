import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.page.html',
  styleUrls: ['./workbench.page.scss'],
})
export class WorkbenchPage implements OnInit {
  readonly menus:any = JSON.parse(localStorage.getItem("menu"));
  public workbench:any = [];
  constructor(private el: ElementRef) {
　}

  ngOnInit() {
    // 通过延时操作更改shadow dom的样式
    setTimeout(() => {
      const toolbar = this.el.nativeElement.querySelectorAll('ion-tab-button');
      for(let i=0; i<toolbar.length; i++) {
        toolbar[i].shadowRoot.querySelector('a').style.padding = '0';
      }
    }, 1000);
    this.filterMenu(this.menus).then(menu => {
      this.workbench = menu;
    });
  }

  filterMenu(menu) {
    return new Promise((resolve, reject) => {
      let pId;
      let arr:any = [];
      for(let i=0; i<menu.length; i++) {
        if(menu[i].menuCode == "workbench") {
          pId = menu[i].guid;
          continue;
        };
        if(menu[i].superiorMenuId == pId) {
          arr.push(menu[i]);
        }
      }
      resolve(arr);
    })
  }
}
