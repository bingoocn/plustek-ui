import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CasePage } from './case.page';
import { CaseDetailComponent } from './case-detail/case-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CasePage
  },{
    path: 'cases/:caseId',
    component: CaseDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CasePage, CaseDetailComponent]
})
export class CasePageModule {}
