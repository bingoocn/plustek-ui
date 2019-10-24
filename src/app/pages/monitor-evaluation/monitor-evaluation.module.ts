import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonitorEvaluationPage } from './monitor-evaluation.page';
import { MonitorEvaluationDetailComponent } from './monitor-evaluation-detail/monitor-evaluation-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorEvaluationPage
  },{
    path: 'evaluations/:evaluationId',
    component: MonitorEvaluationDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitorEvaluationPage, MonitorEvaluationDetailComponent]
})
export class MonitorEvaluationPageModule {}
