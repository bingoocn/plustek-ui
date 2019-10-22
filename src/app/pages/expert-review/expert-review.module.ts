import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpertReviewPage } from './expert-review.page';
import { ExpertBasicInfoComponent } from './expert-basic-info/expert-basic-info.component';
import { ReachStandardEvaluationComponent } from './reach-standard-evaluation/reach-standard-evaluation.component';
import { ExpertGroupComponent } from './expert-group/expert-group.component';
import { DeficiencySuggestionComponent } from './deficiency-suggestion/deficiency-suggestion.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertReviewPage
  },{
    path: 'expertBasicInfo/:reviewId',
    component: ExpertBasicInfoComponent
  },{
    path: 'reachStandardEvaluation/:reviewId',
    component: ReachStandardEvaluationComponent
  },{
    path: 'expertGroup/:reviewId',
    component: ExpertGroupComponent
  },{
    path: 'deficiencySuggestion/:reviewId',
    component: DeficiencySuggestionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpertReviewPage, ExpertBasicInfoComponent, ReachStandardEvaluationComponent, ExpertGroupComponent, DeficiencySuggestionComponent]
})
export class ExpertReviewPageModule {}
