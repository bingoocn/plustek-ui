import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InternalCommunicationPage } from './internal-communication.page';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicAddComponent } from './topic-add/topic-add.component';

const routes: Routes = [
  {
    path: '',
    component: InternalCommunicationPage
  },{
    path: 'topicDetail/:topicId',
    component: TopicDetailComponent
  },{
    path: 'topicAdd',
    component: TopicAddComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InternalCommunicationPage, TopicDetailComponent, TopicAddComponent]
})
export class InternalCommunicationPageModule {}
