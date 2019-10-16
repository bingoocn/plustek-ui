import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImprovementPlanPage } from './improvement-plan.page';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ImprovementPlanPage
  },{
    path: 'plans/:planId',
    component: PlanDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImprovementPlanPage, PlanDetailComponent]
})
export class ImprovementPlanPageModule {}
