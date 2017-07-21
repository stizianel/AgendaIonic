//import { StatusBar } from '@ionic-native/status-bar';

import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Contact } from './../models/contact';
import CryptoJS from 'crypto-js';


@Injectable()
export class AgendaApi {

private risposta: string;
//private azureUrl = 'https://orion101.azurewebsites.net/api/TestAgendaPost?code=1NVtbxn5bokSfhgAf2I0BKQ/t9SQkWPBm6T7wYRupwTGWaDZt5xN2Q==';
//private agendaUrl = 'http://localhost:5050/AgeService.svc/contact';
//private agendaUrl = 'http://2.234.133.94/WS_AgeDemo/AgeService.svc/contact/';
//private agendaUrl = 'http://192.168.1.250/WS_AgeDemo/AgeService.svc/contact/';
private agendaUrl = 'http://192.168.1.250/WS_AgeDemo/AgeService.svc';
//private agendaPost = 'http://localhost:5050/AgeService.svc/updatecontact';
//private agendaPost = 'http://localhost:49697/Api/Questionarios';
private agendaTest = '/test';
private postResult: any = {};
private currentContact: any = {};
private datiLogin: any;
private key = 'CNTRRT53L18G224I';
private token: any;

    constructor(public http: Http) { }


    getCinetto(pid) : Observable<any> {
        return this.http.get(`${this.agendaUrl}/contact/${pid}/${this.key}`)
            .map((response: Response) => {
                this.currentContact = response.json();
                console.log("getCinetto",this.currentContact);
                return this.currentContact.GetContactResult;
            });
    }

    createContact(contact: Contact, pid): Observable<any>{
        //let headers = new Headers({ 'Content-type': 'application/json' });
        //let options = new RequestOptions ({ headers: headers});
        //let options = new RequestOptions();

        //let test = new Contact();

        console.log("createContact:" + JSON.stringify(contact));

        //return this.http.post(`${this.agendaPost}/${pid}`, contact, options)
        return this.http.post(`${this.agendaUrl}/updatecontact/${pid}`, JSON.stringify(contact))
            .map((response: Response) => {this.postResult = response.json();
                console.log("dopo MAP", this.postResult);
                return this.postResult;
        })
            .do(data => console.log('createContact: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // createContact(contact: Contact): Observable<any>{
    //     let headers = new Headers({ 'Content-type': 'application/json' });
    //     let options = new RequestOptions ({ headers: headers});
    //     //let options = new RequestOptions({});
    //     console.log("createContact:" + JSON.stringify(contact));

    //     return this.http.post(this.azureUrl, {}, options)
    //     .map((response: Response) => {this.currentContact = response.json();
    //         console.log(this.currentContact);
    //             return this.currentContact.GetContactResult;
    //     })
    //         .do(data =>console.log('createContact: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    createTest(test: string): Observable<any>{
        let headers = new Headers({ 'Content-type': 'text' });
        let options = new RequestOptions ({ headers: headers});
        return this.http.post(this.agendaTest, {"nome":"Stefano"}, options)
            .map((response: Response) => this.risposta);
    }

    testPost(){
        return this.http.post("http://192.168.1.250/WS_AgeDemo/AgeService.svc/bob", "{'nome':'Stefano'}")
            .map(resp => console.log(resp));
    }

    getToken(){             
        return this.http.get(`${this.agendaUrl}/token`)
            .map((res: Response) => {
                this.token = res.json();
                console.log("Token:", this.token);
                return this.token.GetTokenResult;
            });
    }

    getLogin(loginData: any, token: any): Observable<any>{
        let ToHash = loginData.username.toUpperCase() + "|" + loginData.password + "|" + token;
        let hashCode = CryptoJS.MD5(ToHash);
        let newTk = hashCode.toString().toLowerCase().replace("-","");
        return this.http.get(`${this.agendaUrl}/login/${newTk}/${loginData.username}/PC`)
            .map((res: Response) => {
                this.datiLogin = res.json();
                console.log("getLogin:", this.datiLogin);
                return this.datiLogin.UserLoginResult;
            })
    }

     private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}