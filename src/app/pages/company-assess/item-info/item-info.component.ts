import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss'],
})
export class ItemInfoComponent implements OnInit {
  public a: string;
  public form: any = [];

  constructor() { }

  ngOnInit() {
     this.form = [
      {
        isChecked:true,
        content:'sdawrqrqrsd'
      },
      {
        isChecked:true,
        content:'sdawrqrqrsd'
      },{
        isChecked:true,
        content:'sdawrqrqrsd'
      }
    ]
  }

}
