import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaderReviewPage } from './leader-review.page';
import { LeaderReviewDetailComponent } from './leader-review-detail/leader-review-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderReviewPage
  },{
    path: 'leaderReviews/:reviewId',
    component: LeaderReviewDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaderReviewPage, LeaderReviewDetailComponent]
})
export class LeaderReviewPageModule {}
