import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-message-interaction',
  templateUrl: './message-interaction.page.html',
  styleUrls: ['./message-interaction.page.scss'],
})
export class MessageInteractionPage implements OnInit {
  interactionValue:string;
  public groupInterations:any = [];
  public subGroupInterations:any = [];

  constructor(public http:HttpService) { }

  tabChanged(ev:any){
    console.log('Tab changed', ev);
  }

  ngOnInit() {
    this.interactionValue = "group";
    this.getData();
    // this.groupInterations = [
    //   {
    //     guid:'01',
    //     group:'',
    //     unit:'',
    //     level:'三级',
    //     grade:'80',
    //     person:'张平',
    //     time:'2019.9.10'
    //   },{
    //     guid:'02',
    //     group:'',
    //     unit:'',
    //     level:'一级',
    //     grade:'90',
    //     person:'张真',
    //     time:'2019.11.20'
    //   }
    // ];
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
  getData(){
    this.http.getRequest('/specification_evaluation/'+ '/top_group_monitor').then((response:any)=>{
      if(response && response.length > 0){
        this.groupInterations = response;
      }
    })
  }
}
