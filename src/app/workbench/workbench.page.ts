import {Component, ElementRef, OnInit} from '@angular/core';
import { clearInterval } from 'timers';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.page.html',
  styleUrls: ['./workbench.page.scss'],
})
export class WorkbenchPage implements OnInit {

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
  }

}
