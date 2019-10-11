import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NoticePage } from './notice.page';
import { NoticeDetailComponent } from './components/notice-detail/notice-detail.component';
import { NoticeAddComponent } from './components/notice-add/notice-add.component';

const routes: Routes = [
  {
    path: '',
    component: NoticePage
  },{
    path: 'notices/:noticeId',
    component: NoticeDetailComponent
  },{
    path: 'addNotice',
    component: NoticeAddComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NoticePage,NoticeDetailComponent,NoticeAddComponent]
})
export class NoticePageModule {}
