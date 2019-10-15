import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExperiencePage } from './experience.page';
import { ExperienceDetailComponent } from './experience-detail/experience-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ExperiencePage
  },{
    path: 'experiences/:experienceId',
    component: ExperienceDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExperiencePage, ExperienceDetailComponent]
})
export class ExperiencePageModule {}
