import { PlanosPage } from './../pages/planos/planos';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Slide } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { Storage } from '@ionic/storage';
import { DadosUsuarioProvider } from '../providers/dados-usuario/dados-usuario';
import { AppVersion } from '@ionic-native/app-version';

import { SlidePage } from '../pages/slide/slide';
import { LivrosPage } from '../pages/livros/livros';
import { TitulosPage } from '../pages/titulos/titulos';
import { AudiosPage } from '../pages/audios/audios';
import { LoginPage } from '../pages/login/login';

import { LojaPage } from '../pages/loja/loja';
import { LojaVerPage } from '../pages/loja-ver/loja-ver';
import { MinhaListaPage } from '../pages/minha-lista/minha-lista';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';
import { DicionarioPage } from '../pages/dicionario/dicionario';
import { AtendimentoPage } from '../pages/atendimento/atendimento';
import { BuscaPage } from '../pages/busca/busca';
import { TitulosLivrosPage } from '../pages/titulos-livros/titulos-livros';
import { SairPage } from '../pages/sair/sair';
import { VideosPage } from '../pages/videos/videos';
import { EventosPage } from './../pages/eventos/eventos';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { PrivacidadePage } from '../pages/privacidade/privacidade';
import { MinhaContaPage } from '../pages/minha-conta/minha-conta';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { MeusPlanosPage } from '../pages/meus-planos/meus-planos';
import { LojaAvisoPage } from '../pages/loja-aviso/loja-aviso';
import { TelaTestePage } from '../pages/tela-teste/tela-teste';
import { AssinarPage } from '../pages/assinar/assinar';
import { TermosPage } from '../pages/termos/termos';
import { TestesPage } from '../pages/testes/testes';
import { MinhaConta2Page } from '../pages/minha-conta2/minha-conta2';
import { TimelinePage } from '../pages/timeline/timeline';
import { IAP } from '../providers/iap/iap';

@Component({
  templateUrl: 'app.html' 
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  dados: any = {};
	data:any = {};
	page:any={};
  link:any = {};
  
  IdUserQual : any = {}; 
  EmailUserQual : any= {};
  NomeUserQual : any = {};
  SobrenomeUserQual : any = {};    
  NivelUserQual : any = {};
  PlanoUserQual : any = {};
  FotoUserQual : any = {};

  pages: Array<{title: string, component: any}>;
  public versionnumber: any = 1;

  constructor(
    public platform: Platform, 
    //private oneSignal: OneSignal,
    private iap: InAppPurchase,    
    private device: Device,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private storage: Storage,
    public appVersion: AppVersion,
    public service: DadosUsuarioProvider,
    public IAP: IAP
  ){  
      
    this.initializeApp();   

    // used for an example of ngFor and navigation
    this.pages = [ { title: 'Homea', component: TestesPage } ];

  }

  initializeApp() {

    this.storage.get('Status').then((val) => {

      if(val == 'Logado') { // verificando se o existe usuario com base no token, caso sim sera redirecionado para tela de menu

        // call checkStatus() from our provider after interval is up
        //this.IAP.checkStatus().then( response => {
          //console.log('check status response', response)
          // do something based on response
       // })

        this.rootPage = TimelinePage; 
     
      }else{ // caso não sera redirecionado para o login, pois o token não existe ou esta invalido
        
        this.storage.get('SlideOlhou').then((val) => {

          if(val == 'Sim') { 
            this.rootPage = LoginPage;
          } else { 
            this.rootPage = SlidePage;
          }
              
        }); 
        
      }    
    }); 
		this.platform.ready().then(() => {  

      if(this.platform.is('cordova')) {

        var notificationOpenedCallback = function(jsonData) {

          //console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));

          this.dados = JSON.stringify(jsonData);
          this.data = JSON.parse(this.dados);
          this.page = this.data.notification.payload.additionalData['router'];
          this.link = this.data.notification.payload.additionalData['link'];
          this.playerId = this.data.notification.payload.additionalData['playerId'];          
          
          //console.log('playerId', this.playerId);

          //console.log('router', this.page)
          // do something when a notification is opened
          setTimeout(() => {
            this.navCtrl.push(this.page, {
              item: this.page
            });
          }, 400); 

        };
    
        var getPlayerIdCallback = function (response){

          this.storage.set('playerId', response.userId);
          //console.log('playerId:' + response.userId);
          //this.http.get('http://app.progettoapp.com.br/midias-lider/apple_pagar.php?acao=' + this.acao + '&usuario_situacao=Aprovado&usuario_transactionId=' + val2 + '&uu=' + val1).map(res => res.json()).subscribe(data => {});
          this.storage.set('pushToken', response.pushToken);

        }

        window["plugins"].OneSignal
          .startInit("0685b735-72f8-4161-a5a4-d8a109287694", "824289033483")
          .handleNotificationOpened(notificationOpenedCallback)   
          .endInit();
          
        window["plugins"].OneSignal.getIds(getPlayerIdCallback);

        /*
        //this.oneSignal.startInit("SEU CODIGO NO ONESIGNAL ", "id ONESGNAL");
        this.oneSignal.startInit("0685b735-72f8-4161-a5a4-d8a109287694", "824289033483");
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe(() => {
          // alça recebida aqui como você deseja.
        });
        this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
          // handle opened here how youwish.
          this.dados = JSON.stringify(jsonData);
          this.data = JSON.parse(this.dados);
          this.page = this.data.notification.payload.additionalData['router'];
          //this.link = this.data.notification.payload.additionalData['link'];
          //console.log('link', this.link)
          console.log('router', this.page)
          // do something when a notification is opened
          setTimeout(() => {
            this.nav.push(VideosPage, {
              item: this.page
            });
          }, 4000);
        });
        this.oneSignal.enableVibrate(true);
        this.oneSignal.endInit();
        this.oneSignal.getIds().then((data) => {
          console.log(data);
        }).catch((error) => {
          console.log("deu erro");
        });
        */

        //console.log('Device UUID is 2: ' + this.device.uuid);
        this.storage.set('DeviceID', this.device.uuid);

      } 

      this.userDadosGuardados();

      // android
      //deixa sem nada

      //ios
      //marcar tudo abaixo
      //this.statusBar.styleDefault();      
      //this.statusBar.styleBlackOpaque();
      //this.statusBar.backgroundColorByHexString("#fff");

      this.splashScreen.hide();
      
      if (!this.platform.is('core')) {

        //console.log('Device UUID is 1: ' + this.device.uuid);

        return this.appVersion.getVersionNumber().then( version => {
          this.versionnumber = version;
          //console.log('versao: ', this.versionnumber);
        });
      }

    });
  }

  ionViewDidEnter(){
    
    if(this.platform.is('ios')) {

      this.service.getAppleReciboVer().subscribe(
        data => {

          console.log('contador apple', data.rows[0].Contador)
          this.storage.get('AppleContador').then((val) => {

            if( (val != '') && (data.rows[0].Contador == val) ){
              
            }else{
              this.storage.set('AppleContador', data.rows[0].Contador);
              this.IAP.checkStatus();
            }

          });     

        },
        err => console.log(err)  
      );

    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
      
  }

   userDadosGuardados(){
    this.storage.get('QualUser').then((val) => {
      this.IdUserQual = val;
    })
    this.storage.get('QualEmail').then((val) => {
      this.EmailUserQual = val;
    })
    this.storage.get('QualNome').then((val) => {
      this.NomeUserQual = val;
    })
    this.storage.get('QualSobrenome').then((val) => {
      this.SobrenomeUserQual = val;
    })     
    this.storage.get('QualNivel').then((val) => {
      this.NivelUserQual = val;
    })
    this.storage.get('QualPlano').then((val) => {
      this.PlanoUserQual = val;  
    })
    this.storage.get('QualFoto').then((val) => {
      this.FotoUserQual = val;
    })
  } 

  abrirPaginaLoja(){
    this.nav.setRoot(LojaAvisoPage);
  }
  abrirPaginaNotificacao(){
    this.nav.setRoot(NotificacoesPage);
  }
  abrirPaginaMeusPlanos(){
    this.nav.setRoot(MeusPlanosPage);
  }
  abrirPaginaMinhaCompras(){
    this.nav.setRoot(CarrinhoPage);
  }    
  abrirPaginaMinhalista(){
    this.nav.setRoot(MinhaListaPage);
  }
  abrirPaginaDicionario(){
    this.nav.setRoot(DicionarioPage);
  }
  abrirPaginaAtendimento(){
    this.nav.setRoot(AtendimentoPage);
    //this.nav.setRoot(AssinarPage);
  }  
  abrirPaginaConfig(){
    this.nav.setRoot(ConfiguracoesPage);
  } 
  abrirPaginaConta(){
    this.nav.setRoot(MinhaConta2Page);
  } 
  abrirPaginaTermos(){
    this.nav.push(TermosPage);
  } 
  abrirPaginaSair(){
    this.nav.setRoot(SairPage);
  } 
}
