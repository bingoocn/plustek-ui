import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-internal-communication',
  templateUrl: './internal-communication.page.html',
  styleUrls: ['./internal-communication.page.scss'],
})
export class InternalCommunicationPage implements OnInit {

  public topics:any = [];
  public title:any;

  constructor(public route:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe((data)=>{ 
      this.title = data.title;
    });
    this.topics = [
      {
        guid:'01',
        title:'关于2019年国庆放假的通知',
        publisher:'总部人力资源部',
        pageviews:3000,
        messagenum:2104
      },{
        guid:'0',
        title:'关于个人所得税调整的通知',
        publisher:'总部人力资源部',
        pageviews:5300,
        messagenum:1045
      },{
        guid:'03',
        title:'关于人员调动的通知',
        publisher:'总部人力资源部',
        pageviews:2274,
        messagenum:43
      },{
        guid:'04',
        title:'关于国庆放假的通知',
        publisher:'总部人力资源部',
        pageviews:3000,
        messagenum:2104
      },{
        guid:'05',
        title:'关于个人所得税调整的通知',
        publisher:'总部人力资源部',
        pageviews:5300,
        messagenum:1045
      },{
        guid:'06',
        title:'关于人员调动的通知',
        publisher:'总部人力资源部',
        pageviews:2274,
        messagenum:43
      },{
        guid:'07',
        title:'关于国庆放假的通知',
        publisher:'总部人力资源部',
        pageviews:3000,
        messagenum:2104
      },{
        guid:'08',
        title:'关于个人所得税调整的通知',
        publisher:'总部人力资源部',
        pageviews:5300,
        messagenum:1045
      },{
        guid:'09',
        title:'关于人员调动的通知',
        publisher:'总部人力资源部',
        pageviews:2274,
        messagenum:43
      }
    ];

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
