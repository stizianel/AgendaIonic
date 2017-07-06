
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Contact } from './../models/contact';

@Injectable()
export class AgendaApi {

private risposta: string;
private azureUrl = 'https://orion101.azurewebsites.net/api/TestAgendaPost?code=1NVtbxn5bokSfhgAf2I0BKQ/t9SQkWPBm6T7wYRupwTGWaDZt5xN2Q==';
private agendaUrl = 'http://localhost:5050/AgeService.svc/contact';
private agendaPost = '/v1';
private agendaTest = '/test';
private currentContact: any = {};
private key = 'CNTRRT53L18G224I';

    constructor(public http: Http) { }


    getCinetto(pid) : Observable<any> {
        return this.http.get(`${this.agendaUrl}/${pid}/${this.key}`)
            .map((response: Response) => {
                this.currentContact = response.json();
                console.log(this.currentContact);
                return this.currentContact.GetContactResult;
            });
    }

    createContact(contact: Contact): Observable<any>{
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions ({ headers: headers});
        //let options = new RequestOptions();

        //let test = new Contact();

        console.log("createContact:" + JSON.stringify(contact));

        return this.http.post(this.agendaPost, contact, options)
            .map((response: Response) => {this.currentContact = response.json();
                console.log(this.currentContact);
                return this.currentContact.GetContactResult;
        })
            .do(data =>console.log('createContact: ' + JSON.stringify(data)))
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

     private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}