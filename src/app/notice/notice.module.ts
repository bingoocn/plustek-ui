import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NoticePage } from './notice.page';
import { NoticeDetailComponent } from './components/notice-detail/notice-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NoticePage
  },{
    path: 'notices/:noticeId',
    component: NoticeDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoticePage,NoticeDetailComponent]
})
export class NoticePageModule {}
