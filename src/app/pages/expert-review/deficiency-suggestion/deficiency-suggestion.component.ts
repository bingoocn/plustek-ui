import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-deficiency-suggestion',
  templateUrl: './deficiency-suggestion.component.html',
  styleUrls: ['./deficiency-suggestion.component.scss'],
})
export class DeficiencySuggestionComponent implements OnInit {

  public reviewId:string;
  public suggestions: any = [];

  constructor(public routeInfo:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    this.suggestions = [
      {
        type:'《精益管理规范》达级',
        highLight:'亮点亮点亮点亮点亮点亮点亮点亮点亮点亮点亮点',
        deficiency:'不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处',
        suggestion:'建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议（不超过300字）'
      },{
        type:'精益生产线建设',
        highLight:'亮点亮点亮点亮点亮点亮点亮点亮点亮点亮点亮点',
        deficiency:'不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处',
        suggestion:'建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议（不超过300字）'
      },{
        type:'质量效益改善提示活动',
        highLight:'亮点亮点亮点亮点亮点亮点亮点亮点亮点亮点亮点',
        deficiency:'不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处',
        suggestion:'建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议（不超过300字）'
      },{
        type:'精益管理改善度',
        highLight:'亮点亮点亮点亮点亮点亮点亮点亮点亮点亮点亮点',
        deficiency:'不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处不足之处',
        suggestion:'建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议建议（不超过300字）'
      }
    ]
  }

}
