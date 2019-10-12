import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MytopicPage } from './mytopic.page';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MytopicPage
  },{
    path: 'topicDetail',
    component: TopicDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MytopicPage, TopicDetailComponent]
})
export class MytopicPageModule {}
