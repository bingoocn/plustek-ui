import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewSelfEvaluationPage } from './view-self-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSelfEvaluationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewSelfEvaluationPage]
})
export class ViewSelfEvaluationPageModule {}
