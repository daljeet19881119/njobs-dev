import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployerPage } from './employer';

@NgModule({
  declarations: [
    EmployerPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployerPage),
  ],
})
export class EmployerPageModule {}
