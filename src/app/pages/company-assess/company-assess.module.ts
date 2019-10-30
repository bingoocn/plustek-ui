import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompanyAssessPage } from './company-assess.page';

import {AddAssessComponent} from './add-assess/add-assess.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyAssessPage
  }, {
    path: 'addAssess',
    component: AddAssessComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompanyAssessPage, AddAssessComponent]
})
export class CompanyAssessPageModule {}
