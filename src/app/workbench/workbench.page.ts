import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.page.html',
  styleUrls: ['./workbench.page.scss'],
})
export class WorkbenchPage implements OnInit {
  public banner:any = './banner.jpg';
  constructor() { }

  ngOnInit() {
  }

}
