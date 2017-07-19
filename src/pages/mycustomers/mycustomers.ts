import { CustomerlistPage } from './../customerlist/customerlist';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MycustomersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mycustomers',
  templateUrl: 'mycustomers.html',
})
export class MyCustomersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycustomersPage');
  }

  goToCustomerList() {
    this.navCtrl.push(CustomerlistPage);
  }
}
