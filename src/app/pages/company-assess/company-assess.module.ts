import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompanyAssessPage } from './company-assess.page';

import {AddAssessComponent} from './add-assess/add-assess.component';
import {QuestionsPageComponent} from './questions-page/questions-page.component';
import {ItemInfoComponent} from './item-info/item-info.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: CompanyAssessPage
  }, {
    path: 'addAssess',
    component: AddAssessComponent
  }, {
    path: 'questionPage',
    component: QuestionsPageComponent
  }, {
    path: 'itemInfo',
    component: ItemInfoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompanyAssessPage, AddAssessComponent, QuestionsPageComponent, ItemInfoComponent]
})
export class CompanyAssessPageModule {}
