import { Contact } from './../../models/contact';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendaApi } from './../../shared/agenda-api.service';
//import * as _ from 'lodash';

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {

  cust: any;
  token: any;
  contact: Contact;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public agendaApi: AgendaApi) {
   this.cust = this.navParams.data;
   console.log("**navparams:", this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
    this.token = localStorage.getItem('token');

    this.agendaApi.getContact(this.token, this.cust.CFPiva)
      .subscribe((contact: string) => {
            console.log("getContact", contact);
            //this.contact = JSON.parse(contact);
            this.onContactRetrived(contact);
      });  
  }
  onContactRetrived(contact: string){
    this.contact = JSON.parse(contact);
  }
}
