import { CustomerHomePage } from './../customer-home/customer-home';
import { CustomerDetailPage } from './../customer-detail/customer-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomerlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customerlist',
  templateUrl: 'customerlist.html',
})
export class CustomerlistPage {

  customers = [
    { cfpiva: 'CNTRRT53L18G224I', denominazione: 'Cinetto Roberto'},
    { cfpiva: 'MRNMRA60H02G224E', denominazione: 'Marini Mauro'},
    { cfpiva: 'RSSSBL60H48G224O', denominazione: 'Rossi Elisabetta'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerlistPage');
  }

  
  itemTapped($event, cust) {
    this.navCtrl.push(CustomerHomePage, cust);

  }

}
