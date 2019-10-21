import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluationIndexPage } from './evaluation-index.page';
import { EvaluationIndexSecondLevelComponent } from './evaluation-index-second-level/evaluation-index-second-level.component';
import { IndexDetailComponent } from './index-detail/index-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationIndexPage
  },{
    path: 'evaluationIndexes/:indexId',
    component: EvaluationIndexSecondLevelComponent
  },{
    path: 'indexes/:indexId',
    component: IndexDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluationIndexPage, EvaluationIndexSecondLevelComponent, IndexDetailComponent]
})
export class EvaluationIndexPageModule {}
