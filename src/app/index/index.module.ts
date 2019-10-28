import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IndexPage } from './index.page';
import { BusinessComponent } from '../components/index/business/business.component';
import { GroupComponent } from '../components/index/group/group.component';
import { ExpertComponent } from '../components/index/expert/expert.component';


const routes: Routes = [
  {
    path: '',
    component: IndexPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    IndexPage, 
    BusinessComponent,
    GroupComponent,
    ExpertComponent
  ]
})
export class IndexPageModule {}
