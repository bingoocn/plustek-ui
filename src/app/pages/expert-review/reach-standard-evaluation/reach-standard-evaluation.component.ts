import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-reach-standard-evaluation',
  templateUrl: './reach-standard-evaluation.component.html',
  styleUrls: ['./reach-standard-evaluation.component.scss'],
})
export class ReachStandardEvaluationComponent implements OnInit {

  public reviewId:string;
  public points: any = [];

  constructor(public routeInfo:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    this.points = [
      {
        guid:'01',
        title:'1.1.1  质量损失率',
        reachLevel:'五级',
        score:10
      },{
        guid:'02',
        title:'1.1.2  要点题目2',
        reachLevel:'四级',
        score:8
      },{
        guid:'03',
        title:'1.1.3  要点题目3',
        reachLevel:'三级',
        score:8
      },{
        guid:'03',
        title:'1.1.3  要点题目3',
        reachLevel:'三级',
        score:8
      },{
        guid:'03',
        title:'1.1.3  要点题目3',
        reachLevel:'三级',
        score:8
      }
    ]
  }

}
