import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-interaction',
  templateUrl: './message-interaction.page.html',
  styleUrls: ['./message-interaction.page.scss'],
})
export class MessageInteractionPage implements OnInit {
  interactionValue:string;
  public groupInterations:any = [];
  public subGroupInterations:any = [];

  constructor() { }

  tabChanged(ev:any){
    console.log('Tab changed', ev);
  }

  ngOnInit() {
    this.interactionValue = "group";
    this.groupInterations = [
      {
        guid:'01',
        group:'',
        unit:'',
        level:'三级',
        grade:'80',
        person:'张平',
        time:'2019.9.10'
      },{
        guid:'02',
        group:'',
        unit:'',
        level:'一级',
        grade:'90',
        person:'张真',
        time:'2019.11.20'
      }
    ];
    this.subGroupInterations = [
      {
        guid:'01',
        group:'',
        unit:'',
        level:'三级',
        grade:'89',
        person:'张可时',
        time:'2019.9.10'
      }
    ];
  }

}
