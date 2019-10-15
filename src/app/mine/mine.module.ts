import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinePage } from './mine.page';
import { SetupComponent } from './setup/setup.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { InternalCommunicationPageModule } from '../pages/internal-communication/internal-communication.module';

const routes: Routes = [
  {
    path: '',
    component: MinePage
  },{
    path: 'setup',
    component: SetupComponent
  },{
    path: 'internal-communication',
    component: InternalCommunicationPageModule
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MinePage, SetupComponent, ModifyPasswordComponent],
  entryComponents: [ModifyPasswordComponent]
})
export class MinePageModule {}
