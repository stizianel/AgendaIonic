
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

  //questionarioForm: FormGroup;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;

  contact = new Contact;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public formBuilder: FormBuilder, 
              public agendaApi: AgendaApi,
              public loadingController: LoadingController ) {
     this.slideOneForm = formBuilder.group({
      denominazione: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      nome: ['', Validators.compose([Validators.maxLength(25)])],
      codfiscale: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$'), Validators.required])],
      piva: ['', Validators.compose([Validators.maxLength(11), Validators.pattern('[0-9]{11}')])],
      persona: ['', Validators.compose([Validators.maxLength(1),Validators.pattern('[FG]')])],
      dataNascita: [''],
      sesso: ['', Validators.compose([Validators.maxLength(1),Validators.pattern('[MF]')])],
      telefono: [''],
      fax: [''],
      cellulare: [''],
      email: [''],
      altMail: ['']
     });
     this.slideTwoForm = formBuilder.group({
      presso: [''],
      indirizzo: ['', Validators.required],
      cap: [''],
      comune: ['', Validators.required],
      localita: [''],
      provincia: [''],
      pressoC: [''],
      indirizzoC: [''],
      capC: [''],
      comuneC: [''],
      localitaC: [''],
      provinciaC: ['']
     });
     this.slideThreeForm = formBuilder.group({
      commPreferita: [''],
      datiPersonali: ['', Validators.required],
      datiSensibili: [''],
      promozioneCommerciale: [''],
      promozioneTerzi: [''],
      profilazione: [''],
      coniugato: [''],
      denominazioneConvivente: [''],
      codiceFiscaleConvivente: [''],
      professioneConvivente: [''],
      dataNascitaConvivente: [''],
      professione: [''],
      abitazioneProprieta: [''],
      tipoAbitazione: [''],
      numeroFigli: [''],
      numeroAnimali: [''],
      numeroImmobili: [''],
      numeroAutomobili: [''],
      numeroNatanti: [''],
      numeroPolizzeConcorrenza: ['']
    });

  }

  ionViewDidLoad(){
    
    console.log('ionViewDidLoad HomePage');
    let loader = this.loadingController.create({
      content: 'recupero dati ...'
    });
    loader.present().then(() => {
       this.agendaApi.getCinetto('99999').subscribe(
        (contact: string) => {
        //this.contact = JSON.parse(contact);
        this.onContactRetrived(contact);
        loader.dismiss();
    });
          console.log("tipo:", typeof this.contact);  
    });
  }

  onContactRetrived(contact: string){
    console.log("tipoOnContact:", typeof this.contact);
    this.contact = JSON.parse(contact);
    console.log("tipoOnContact:",contact);

    this.slideOneForm.patchValue({
      denominazione: this.contact.Denominazione,
      nome: this.contact.Nome,
      codfiscale: this.contact.CodFiscale,
      piva: this.contact.PIva,
      persona: this.contact.Persona,
      dataNascita: this.contact.DataNascita,
      telefono: this.contact.Telefono,
      fax: this.contact.Fax,
      cellulare: this.contact.Cellulare,
      email: this.contact.Mail,
      altMail: this.contact.MailAlternativa
    });
    this.slideTwoForm.patchValue({
      presso: this.contact.Presso,
      comune: this.contact.Comune,
      cap: this.contact.CAP,
      localita: this.contact.Localita,
      pressoC: this.contact.PressoC,
      comuneC: this.contact.ComuneC,
      capC: this.contact.CAPC,
      localitaC: this.contact.LocalitaC
    });
    this.slideThreeForm.patchValue({
      commPreferita: this.contact.CommPreferita,
      datiPersonali: this.contact.DatiPersonali,
      datiSensibili: this.contact.DatiSensibili,
      promozioneCommerciale: this.contact.PromozioneCommerciale,
      promozioneTerzi: this.contact.PromozioneTerzi,
      profilazione: this.contact.Profilazione,
      coniugato: this.contact.Coniugato,
      denominazioneConvivente: this.contact.DenominazioneConvivente,
      codiceFiscaleConvivente: this.contact.CodiceFiscaleConvivente,
      professioneConvivente: this.contact.ProfessioneConvivente,
      dataNascitaCovivente: this.contact.DataNascitaConvivente,
      professione: this.contact.Professione,
      abitazioneProprieta: this.contact.AbitazioneProprieta,
      tipoAbitazione: this.contact.TipoAbitazione,
      numeroFigli: this.contact.NumeroFigli,
      numeroAnimali: this.contact.NumeroAnimali,
      numeroImmobili: this.contact.NumeroImmobili,
      numeroAutomobili: this.contact.NumeroAutomobili,
      numeroNatanti: this.contact.NumeroNatanti,
      numeroPolizzeConcorrenza: this.contact.NumeroPolizzeConcorrenza
    });
    console.log(this.slideOneForm);
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
    else if(!this.slideThreeForm.valid){
      this.signupSlider.slideTo(2);
    }
    else {
      console.log("Success");
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
      console.log(this.slideThreeForm.value);
    }
  }

}
