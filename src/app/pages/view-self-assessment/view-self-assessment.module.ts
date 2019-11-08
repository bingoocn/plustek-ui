import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewSelfAssessmentPage } from './view-self-assessment.page';
import { AssessDetailComponent } from './assess-detail/assess-detail.component';
import { TopicsDetailComponent } from './topics-detail/topics-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSelfAssessmentPage
  },{
    path: 'assessDetail/:assessId',
    component: AssessDetailComponent
  },{
    path: 'topicsDetail/:assessId',
    component: TopicsDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewSelfAssessmentPage,AssessDetailComponent,TopicsDetailComponent]
})
export class ViewSelfAssessmentPageModule {}
