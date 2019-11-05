import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaderCheckPage } from './leader-check.page';
import { SelfAssessmentDetailComponent } from './self-assessment-detail/self-assessment-detail.component';
import { LeaderCheckDetailComponent } from './leader-check-detail/leader-check-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderCheckPage
  },{
    path: 'selfAssessmentDetail/:assessId',
    component: SelfAssessmentDetailComponent
  },{
    path: 'leaderCheckDetail/:assessId',
    component: LeaderCheckDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaderCheckPage, SelfAssessmentDetailComponent, LeaderCheckDetailComponent]
})
export class LeaderCheckPageModule {}
