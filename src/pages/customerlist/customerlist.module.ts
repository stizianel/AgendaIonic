import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerlistPage } from './customerlist';

@NgModule({
  declarations: [
    CustomerlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerlistPage),
  ],
  exports: [
    CustomerlistPage
  ]
})
export class CustomerlistPageModule {}
