import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerProductsPage } from './customer-products';

@NgModule({
  declarations: [
    CustomerProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerProductsPage),
  ],
  exports: [
    CustomerProductsPage
  ]
})
export class CustomerProductsPageModule {}
