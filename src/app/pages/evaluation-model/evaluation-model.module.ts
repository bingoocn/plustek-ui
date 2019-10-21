import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluationModelPage } from './evaluation-model.page';
import { EvaluationModelSecondLevelComponent } from './evaluation-model-second-level/evaluation-model-second-level.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationModelPage
  },{
    path: 'evaluationIndexes/:indexId',
    component: EvaluationModelSecondLevelComponent
  },{
    path: 'indexes/:indexId',
    component: ModelDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluationModelPage, EvaluationModelSecondLevelComponent, ModelDetailComponent]
})
export class EvaluationModelPageModule {}
