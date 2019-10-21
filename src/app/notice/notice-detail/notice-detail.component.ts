import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss'],
})
export class NoticeDetailComponent implements OnInit {

  public notice: any;

  constructor(public route:ActivatedRoute) { 

  }
    
  ngOnInit() {
    this.route.queryParams.subscribe((data)=>{ 
      let id = data.id;
    });
  }
  // 返回
  goBack(){
    
  }
}
