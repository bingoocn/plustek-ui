import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaderCheckPage } from './leader-check.page';
// import { AssessInfoPage } from '../assess-info/assess-info.page';

const routes: Routes = [
  {
    path: '',
    component: LeaderCheckPage
  }
  // ,
  // {
  //   path: 'assessInfo/:assessId',
  //   component: AssessInfoPage,
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaderCheckPage ]
})
export class LeaderCheckPageModule {}
