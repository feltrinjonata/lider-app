import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { BrowserTab } from '@ionic-native/browser-tab';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { IAP } from '../../providers/iap/iap';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { CadastroSistemaPage } from '../cadastro-sistema/cadastro-sistema';

@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private Storage: Storage,
    public platform: Platform,  
    public http: Http,
    public IAP: IAP,
    private iap: InAppPurchase,
    public service: DadosUsuarioProvider,             
    private iab: InAppBrowser,
    private browserTab: BrowserTab
  ){


  }
  ionViewDidLoad() {
    
    this.Storage.set('SlideOlhou', '');
    this.Storage.set('PrimeiroAcesso', 0);

  }
  
  ionViewDidEnter() {

    if(this.platform.is('ios')) {

      this.service.getAppleReciboVer().subscribe(
        data => {

          console.log('contador apple', data.rows[0].Contador)
          this.Storage.get('AppleContador').then((val) => {

            if( (val != '') && (data.rows[0].Contador == val) ){
              
            }else{
              this.Storage.set('AppleContador', data.rows[0].Contador);
              this.IAP.checkStatus();
            }

          });     

        },
        err => console.log(err)  
      );

    }
  }

  continue(item: string) {     
    this.navCtrl.push(LoginPage,{ item });
  }
  /*
  public cadastroUser(){

    ///let url = 'http://app.progettoapp.com.br/novo-cadastro';
    //const browser = this.iab.create(url, '_blank', this.options);    
    //browser.show(); 

    this.browserTab.isAvailable()
    .then((isAvailable: boolean) => {

    if(isAvailable) {

        this.browserTab.openUrl('http://app.progettoapp.com.br/novo-cadastro');

    } else {

        // if custom tabs are not available you may  use InAppBrowser

    }

    }); 

  }  
  */
  cadastroUser(item: string) {   
    
    // ios
    this.navCtrl.push(CadastroUsuarioPage, { item } );
    
    // android
    //this.navCtrl.push(CadastroSistemaPage, { item } );

  } 
  pular() {   
    this.navCtrl.push(LoginPage);
  }

    /*<ion-header>
	<ion-navbar>
		<ion-buttons end>
			<button ion-button color="primary" (click)= "pular()">Pular Introduçao</button>
		</ion-buttons>
	</ion-navbar>
</ion-header>*/

}
