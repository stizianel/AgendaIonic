//import { AppErrorHandler } from './../shared/app-error-handler';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerlistPage } from './../pages/customerlist/customerlist';
import { MyCustomersPage } from './../pages/mycustomers/mycustomers';
import { CustomerDetailPage } from './../pages/customer-detail/customer-detail';
import { CustomerHomePage } from './../pages/customer-home/customer-home';
import { CustomerProductsPage } from './../pages/customer-products/customer-products';

import { AgendaApi } from './../shared/agenda-api.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerlistPage,
    MyCustomersPage,
    CustomerDetailPage,
    CustomerHomePage,
    CustomerProductsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerlistPage,
    MyCustomersPage,
    CustomerDetailPage,
    CustomerHomePage,
    CustomerProductsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AgendaApi,
    DatePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
