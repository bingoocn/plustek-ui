import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-index-second-level',
  templateUrl: './evaluation-index-second-level.component.html',
  styleUrls: ['./evaluation-index-second-level.component.scss'],
})
export class EvaluationIndexSecondLevelComponent implements OnInit {

  public indexes:any = [];

  constructor() { }

  ngOnInit() {
    this.indexes = [
      {
        guid:'01',
        indexName:'要项1',
        children:[
          {
            guid:'0101',
            indexName:'要点1'
          },{
            guid:'0102',
            indexName:'要点2'
          },{
            guid:'0103',
            indexName:'要点3'
          },{
            guid:'0104',
            indexName:'要点4'
          }
        ]
      },{
        guid:'02',
        indexName:'要项2',
        children:[
          {
            guid:'0201',
            indexName:'要点5'
          },{
            guid:'0202',
            indexName:'要点6'
          }
        ]
      },{
        guid:'03',
        indexName:'要项3'
      },{
        guid:'04',
        indexName:'要项4'
      }
    ]
  }

}
