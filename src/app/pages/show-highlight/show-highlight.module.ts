import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowHighlightPage } from './show-highlight.page';
import { HighlightInfoComponent } from './highlight-info/highlight-info.component';

const routes: Routes = [
  {
    path: '',
    component: ShowHighlightPage
  },
  {
    path: 'highlightInfo/:highlightInfoId',
    component: HighlightInfoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowHighlightPage,HighlightInfoComponent]
})
export class ShowHighlightPageModule {}
