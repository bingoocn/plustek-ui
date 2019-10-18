import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  public slideOpts:any = {
    effect: 'flip', speed: 400, loop:true,autoplay: {delay: 2000}
  }
  @ViewChild("slide", { static: false }) slide;
  
  constructor() { }

  ngOnInit() {}
  // 解决手动滑动后轮播图无法正常轮播
  touchEnd() {
    this.slide.startAutoplay();
  }
  prev() {
    this.slide.slidePrev();
  }
  next() {
    this.slide.slideNext();
  }
  // 请求数据完成后如果轮播图工作异常，调用该方法
  update() {
    this.slide.update();
  }
}
