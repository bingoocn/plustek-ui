import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessageInteractionPage } from './message-interaction.page';
import { InterationInfoComponent } from './interation-info/interation-info.component';

const routes: Routes = [
  {
    path: '',
    component: MessageInteractionPage
  },{
    path: 'interationInfo/:interationId',
    component: InterationInfoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessageInteractionPage,InterationInfoComponent]
})
export class MessageInteractionPageModule {}
