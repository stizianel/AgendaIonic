
import { HomePage } from './../home/home';
import { CustomerlistPage } from './../customerlist/customerlist';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AgendaApi } from './../../shared/agenda-api.service';

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
  
  private token: any;
  loginData = { username:'', password:'' };
  loading: any;
  logResp: string;
  newToken: string[];
  isLogin: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public agendaApi: AgendaApi,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycustomersPage');
  }

  goToCustomerList() {
    this.navCtrl.push(CustomerlistPage);
  }

  goToQuestionnaire() {
    this.navCtrl.push(HomePage);
  }

  loginToAgenda(){
    this.agendaApi.getToken()
      .subscribe((token) => {
        console.log("loginToAgenda", token);
        this.token = token;
      });
    
    this.agendaApi.getLogin(this.loginData, this.token)
      .subscribe((logResp) => {
        if(logResp){
          this.logResp = logResp;
          this.newToken = this.logResp.split("|",2);
          console.log("newToken:", this.newToken[1] );
          localStorage.setItem('token', this.newToken[1]);
          this.isLogin = 'true';
          this.presentToast("Benvenuto in Agenda")
        };
      }, (error) => { this.isLogin = 'false';
                      this.presentToast(error);
    });
        if(this.isLogin == 'true')
          this.navCtrl.push(CustomerlistPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

   presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
