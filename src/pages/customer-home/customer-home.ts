
import { CustomerProductsPage } from './../customer-products/customer-products';
import { CustomerDetailPage } from './../customer-detail/customer-detail';
//import { MyCustomersPage } from './../mycustomers/mycustomers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the CustomerHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer-home',
  templateUrl: 'customer-home.html',
})
export class CustomerHomePage {

  cust: any;
  customerDetailTab = CustomerDetailPage;
  customerProductsTab = CustomerProductsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cust = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerHomePage');
  }

  goHome() {
    //this.navCtrl.push(MyCustomersPage);
    this.navCtrl.popToRoot();
  }
}
