import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DepartmentCheckPage } from './department-check.page';
import { DepaertmentInfoComponent } from './depaertment-info/depaertment-info.component';
import { QuestionsPageComponent } from './questions-page/questions-page.component'
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: DepartmentCheckPage
  }, {
    path: 'department-info',
    component: DepaertmentInfoComponent
  }, {
    path: 'quest-page',
    component: QuestionsPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuestionsPageComponent, DepaertmentInfoComponent, DepartmentCheckPage]
})
export class DepartmentCheckPageModule { }
