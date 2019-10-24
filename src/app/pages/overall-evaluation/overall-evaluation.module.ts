import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OverallEvaluationPage } from './overall-evaluation.page';
import { EvaluationInfoComponent } from './evaluation-info/evaluation-info.component';

const routes: Routes = [
  {
    path: '',
    component: OverallEvaluationPage
  },{
    path: 'evaluationInfo/:evaluationId',
    component: EvaluationInfoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OverallEvaluationPage, EvaluationInfoComponent]
})
export class OverallEvaluationPageModule {}
