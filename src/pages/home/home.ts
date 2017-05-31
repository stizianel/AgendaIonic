
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from 'ionic-angular';

import { UsernameValidator } from './../../validators/username';
import { AgeValidator } from './../../validators/age';

import { Contact } from '../../models/contact';
import { AgendaApi } from './../../shared/agenda-api.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  contact = new Contact;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public formBuilder: FormBuilder, 
              public agendaApi: AgendaApi,
              public loadingController: LoadingController ) {

    this.slideOneForm = formBuilder.group({
      denominazione: [this.contact.Denominazione, Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      nome: [this.contact.Nome, Validators.compose([Validators.maxLength(25), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      codfiscale: [this.contact.CodFiscale, Validators.compose([Validators.maxLength(16), Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$'), Validators.required])],
      piva: [this.contact.PIva, Validators.compose([Validators.maxLength(11), Validators.pattern('[0-9]{11}')])],
      persona: [this.contact.Persona, Validators.compose([Validators.maxLength(1),Validators.pattern('[FG]')])]
    });

    this.slideTwoForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
      privacy: ['', Validators.required],
      bio: ['']
    });

  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad HomePage');
    let loader = this.loadingController.create({
      content: 'recupero dati ...'
    });
    loader.present().then(() => {
       this.agendaApi.getCinetto('99999').subscribe(data => {
        this.contact = JSON.parse(data);
        loader.dismiss();
    });
          console.log("tipo:", typeof this.contact);  
    });
  }

  next(){
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  save() {
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
      this.signupSlider.slideTo(0);
    }
    else if(!this.slideTwoForm.valid){
      this.signupSlider.slideTo(1);
    }
    else {
      console.log("Success");
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
    }
  }

}
