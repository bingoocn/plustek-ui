import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-model',
  templateUrl: './evaluation-model.page.html',
  styleUrls: ['./evaluation-model.page.scss'],
})
export class EvaluationModelPage implements OnInit {

  public indexes:any = [];

  constructor() { }

  ngOnInit() {
    this.indexes = [
      {
        guid:'01',
        indexName:'维度1'
      },{
        guid:'02',
        indexName:'维度2'
      },{
        guid:'03',
        indexName:'维度3'
      },{
        guid:'04',
        indexName:'维度4'
      },{
        guid:'05',
        indexName:'维度5'
      }
    ]
  }

}
