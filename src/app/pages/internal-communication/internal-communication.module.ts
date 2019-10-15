import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InternalCommunicationPage } from './internal-communication.page';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

const routes: Routes = [
  {
    path: '',
    component: InternalCommunicationPage
  },{
    path: 'topicDetail/:topicId',
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
  declarations: [InternalCommunicationPage, TopicDetailComponent]
})
export class InternalCommunicationPageModule {}
