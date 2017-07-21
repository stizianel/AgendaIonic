import { DatePipe } from '@angular/common';

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

  tempPin = "99999";

  @ViewChild('signupSlider') signupSlider: any;

  //questionarioForm: FormGroup;
  errorMessage: string;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;

  contact = new Contact;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public formBuilder: FormBuilder, 
              public agendaApi: AgendaApi,
              public loadingController: LoadingController,
              public datepipe: DatePipe ) {
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
       this.agendaApi.getCinetto('99999')
        .subscribe(
          (contact: string) => {
            console.log("subscribe", contact);
            //this.contact = JSON.parse(contact);
            this.onContactRetrived(contact);
        loader.dismiss();
    });
          console.log("tipo:", typeof this.contact);  
    });
  }

  // this.contact= new Contact();
  // this.onContactRetrived(this.contact);
  //}


  onContactRetrived(contact: string){
    //console.log("tipoOnContact:", typeof this.contact);
    this.contact = JSON.parse(contact);
    console.log("onContectRetrived:", this.contact);

    this.slideOneForm.patchValue({
      denominazione: this.contact.Denominazione,
      nome: this.contact.Nome,
      codfiscale: this.contact.CodFiscale,
      piva: this.contact.Piva,
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
      cap: this.contact.Cap,
      localita: this.contact.Localita,
      pressoC: this.contact.PressoC,
      comuneC: this.contact.ComuneC,
      capC: this.contact.CapC,
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
    console.log("slide1:", this.slideOneForm);
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
      let newContact = this.formToDTO(this.slideOneForm, this.slideTwoForm, this.slideThreeForm, this.contact)

      console.log("wcontact è di tipo:", typeof newContact);

      this.agendaApi.createContact(newContact, '99999')
        .subscribe(
          (resp) => {
            alert("Inserimento effettuato");
            console.log("RESP:", resp);
            this.onSaveComplete();
          },
          (error: any) => this.errorMessage = <any>error
        );

      // this.agendaApi.testPost().subscribe(
      //   () =>{}
      // );

      console.log("save errore: " + this.errorMessage);
      // console.log(this.slideOneForm.value);
      // console.log(this.slideTwoForm.value);
      // console.log(this.slideThreeForm.value);
    }
  }
  onSaveComplete(): void{
    this.slideOneForm.reset();
    this.slideTwoForm.reset();
    this.slideThreeForm.reset();
  }
  formToDTO(slide1: FormGroup, slide2: FormGroup, slide3: FormGroup, oldContact: Contact): Contact{
    let c = new Contact();

    c.Pin = this.tempPin;
    c.ErrorCode = oldContact.ErrorCode;
    c.ErrorDesc = oldContact.ErrorDesc;
    c.Source= oldContact.Source;
    c.Utente = oldContact.Utente;
    c.Stato = oldContact.Stato;
    c.Codice = oldContact.Codice;
    c.RecID = oldContact.RecID;

    let wcf = slide1.get('codfiscale').value;
    let wpiva = slide1.get('piva').value;
    c.CFPiva = wcf ? wcf : wpiva;
    c.CodFiscale = slide1.get('codfiscale').value;
    c.Piva = slide1.get('piva').value;
    c.Denominazione = slide1.get('denominazione').value;
    c.Nome = slide1.get('nome').value;
    c.Persona = slide1.get('persona').value;
    c.DataNascita  = slide1.get('dataNascita').value ? this.datepipe.transform(slide1.get('dataNascita').value, 'dd-MM-yyyy') : "";
    //c.DataNascita = slide1.get('dataNascita').value
    c.Telefono = slide1.get('telefono').value;
    c.Fax = slide1.get('fax').value;
    c.Cellulare = slide1.get('cellulare').value;
    c.Mail = slide1.get('email').value;
    c.MailAlternativa = slide1.get('altMail').value;
    c.Presso = slide2.get('presso').value;
    c.Comune = slide2.get('comune').value;
    c.Cap = slide2.get('cap').value;
    c.Localita = slide2.get('localita').value;
    c.PressoC = slide2.get('pressoC').value;
    c.ComuneC = slide2.get('comuneC').value;
    c.CapC = slide2.get('capC').value;
    c.LocalitaC = slide2.get('localitaC').value;
    let wcommPref: string = slide3.get('commPreferita').value;
    c.CommPreferita = wcommPref.substring(0,1);
    c.DatiPersonali = slide3.get('datiPersonali').value ? 'S' : 'N';
    c.DatiSensibili = slide3.get('datiSensibili').value ? 'S' : 'N';
    c.PromozioneCommerciale = slide3.get('promozioneCommerciale').value ? 'S' : 'N';
    c.PromozioneTerzi = slide3.get('promozioneTerzi').value ? 'S' : 'N';
    c.Profilazione = slide3.get('profilazione').value  ? 'S' : 'N';
    c.Coniugato = slide3.get('coniugato').value ? 'S' : 'N';
    c.DenominazioneConvivente = slide3.get('denominazioneConvivente').value;
    c.CodiceFiscaleConvivente = slide3.get('codiceFiscaleConvivente').value;
    c.ProfessioneConvivente = slide3.get('professioneConvivente').value;
    c.DataNascitaConvivente = slide3.get('dataNascitaConvivente').value ? this.datepipe.transform(slide3.get('dataNascitaConvivente').value,'dd-MM-yyyy') : "" ;
    c.Professione = slide3.get('professione').value;
    c.AbitazioneProprieta = slide3.get('abitazioneProprieta').value ? 'S' : 'N';
    c.TipoAbitazione = slide3.get('tipoAbitazione').value;
    c.NumeroFigli = slide3.get('numeroFigli').value;
    c.NumeroAnimali = slide3.get('numeroAnimali').value;
    c.NumeroImmobili = slide3.get('numeroImmobili').value;
    c.NumeroAutomobili = slide3.get('numeroAutomobili').value;
    c.NumeroNatanti = slide3.get('numeroNatanti').value;
    c.NumeroPolizzeConcorrenza = slide3.get('numeroPolizzeConcorrenza').value;   
    
    return c;
  }
}
