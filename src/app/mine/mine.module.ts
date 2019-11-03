import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinePage } from './mine.page';
import { SetupComponent } from './setup/setup.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { MyreportComponent } from './myreport/myreport.component';
import { MytopicComponent } from './mytopic/mytopic.component';
import { MyreplyComponent } from './myreply/myreply.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { MyreviewComponent } from './myreview/myreview.component';
import { ReviewDetailComponent } from './myreview/review-detail/review-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MinePage
  },{
    path: 'setup',
    component: SetupComponent
  },{
    path: 'mytopic',
    component: MytopicComponent
  },{
    path: 'myreply',
    component: MyreplyComponent
  },{
    path: 'myreport',
    component: MyreportComponent
  },{
    path: 'myreview',
    component: MyreviewComponent
  },{
    path: 'topicDetail/:topicId',
    component: TopicDetailComponent
  },{
    path: 'reviewDetail/:reviewId',
    component: ReviewDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MinePage, SetupComponent, ModifyPasswordComponent, MyreportComponent, MytopicComponent,TopicDetailComponent,MyreplyComponent,MyreviewComponent,ReviewDetailComponent],
  entryComponents: [ModifyPasswordComponent]
})
export class MinePageModule {}
