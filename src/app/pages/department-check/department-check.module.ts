import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DepartmentCheckPage } from './department-check.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DepartmentCheckPage]
})
export class DepartmentCheckPageModule {}
