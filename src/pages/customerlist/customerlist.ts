//import { StatusBar } from '@ionic-native/status-bar';
import { AppError } from './../../shared/app-error';

import { CustomerHomePage } from './../customer-home/customer-home';
//import { CustomerDetailPage } from './../customer-detail/customer-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendaApi } from './../../shared/agenda-api.service';

//import * as _ from 'lodash'; 

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
  
  customers: any[];
  queryText: string;
  private isOn: boolean = false;

  temp_customers: any[]

  token: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public agendaApi: AgendaApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerlistPage');
    this.token = localStorage.getItem('token');
    console.log('ionViewDidLoad CustomerlistPage', this.token);
        
    this.agendaApi.getAnag(this.token)
      .subscribe((anagrafica: string) => {
        console.log("getAnag-anagrafica", anagrafica)
        this.customers = JSON.parse(anagrafica);
        this.isOn = true;
        this.initializeCustomers();
        console.log("customerList:", this.customers)
      }, (error: AppError) => {
        alert('An unexpected error occurred');
        console.log(error)
      });
  }
  
  itemTapped($event, cust) {
    this.navCtrl.push(CustomerHomePage, cust);

  }

  initializeCustomers() {
    this.temp_customers = this.customers;
  }

  updateCustomers(ev: any) {
    this.initializeCustomers();

    console.log("updateCustomers", this.customers);
    console.log("updateCustomers", ev.target.value);
    console.log("updateCustomers", this.queryText);
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.temp_customers = this.temp_customers.filter((item) => {
        return (item.Denominazione.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
