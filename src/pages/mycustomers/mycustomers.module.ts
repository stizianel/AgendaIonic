import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCustomersPage } from './mycustomers';

@NgModule({
  declarations: [
    MyCustomersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCustomersPage),
  ],
  exports: [
    MyCustomersPage
  ]
})
export class MycustomersPageModule {}
