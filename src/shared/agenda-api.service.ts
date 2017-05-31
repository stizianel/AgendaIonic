import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendaApi {

private agendaUrl = 'http://2.234.133.94/WS_AgeDemo/AgeService.svc/contact';
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
}