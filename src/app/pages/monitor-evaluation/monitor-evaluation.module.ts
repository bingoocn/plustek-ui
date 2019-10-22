import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonitorEvaluationPage } from './monitor-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorEvaluationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitorEvaluationPage]
})
export class MonitorEvaluationPageModule {}
