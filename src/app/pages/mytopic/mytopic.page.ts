import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mytopic',
  templateUrl: './mytopic.page.html',
  styleUrls: ['./mytopic.page.scss'],
})
export class MytopicPage implements OnInit {

  public topics:any = [];

  constructor() { 
    
  }

  ngOnInit() {
    this.topics = [
      {
        title:'关于2019年国庆放假的通知',
        publisher:'总部人力资源部',
        pageviews:3000,
        messagenum:2104
      },{
        title:'关于个人所得税调整的通知',
        publisher:'总部人力资源部',
        pageviews:5300,
        messagenum:1045
      },{
        title:'关于人员调动的通知',
        publisher:'总部人力资源部',
        pageviews:2274,
        messagenum:43
      },{
        title:'关于国庆放假的通知',
        publisher:'总部人力资源部',
        pageviews:3000,
        messagenum:2104
      },{
        title:'关于个人所得税调整的通知',
        publisher:'总部人力资源部',
        pageviews:5300,
        messagenum:1045
      },{
        title:'关于人员调动的通知',
        publisher:'总部人力资源部',
        pageviews:2274,
        messagenum:43
      },{
        title:'关于国庆放假的通知',
        publisher:'总部人力资源部',
        pageviews:3000,
        messagenum:2104
      },{
        title:'关于个人所得税调整的通知',
        publisher:'总部人力资源部',
        pageviews:5300,
        messagenum:1045
      },{
        title:'关于人员调动的通知',
        publisher:'总部人力资源部',
        pageviews:2274,
        messagenum:43
      }
    ]
  }

  // 关键字搜索
  getTopics(ev: any) {
    this.ngOnInit();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.topics = this.topics.filter((item) => {
        return (item.title.indexOf(val) > -1);
      })
    }
  }
}
