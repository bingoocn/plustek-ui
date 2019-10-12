import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // 通过延时操作更改shadow dom的样式
    setTimeout(() => {
      const toolbar = this.el.nativeElement.querySelectorAll('ion-item');
      for(let i=0; i<toolbar.length; i++) {
        toolbar[i].shadowRoot.querySelector('.item-inner').style.borderBottomColor = '#eeeeee';
      }
    }, 200);
  }

}
