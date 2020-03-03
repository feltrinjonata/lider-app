import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { OntoarteVerPage } from './../ontoarte-ver/ontoarte-ver';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-eventos-form',
  templateUrl: 'eventos-form.html',
})
export class EventosFormPage {

  data: any = {};  
  loading: Loading;
  item = []; 
  ValorSelecionado : any = {};

  api : string =  'http://app.progettoapp.com.br/arquivos/r';
 
	isenabled:boolean=true;

  IdUserQual : any = {}; 
  NomeUserQual : any = {}; 
  SobrenomeUserQual : any = {};   
  EmailUserQual : any = {};   
  FoneUserQual : any = {};   
  
  constructor(
    private payPal: PayPal,
    private socialSharing: SocialSharing,
    public service : DadosUsuarioProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage:Storage,
    private http: Http,
    private alertCtrl: AlertController
  ){

    this.getDados();
    this.userDadosGuardados();
    
  }

  ionViewDidLoad() {

  }

	getDados() {
		this.service.getEventos();
    this.item = this.navParams.get('item');
    this.ValorSelecionado = this.navParams.get('ValorSelecionado');
    //console.log('bernardo: ', this.ValorSelecionado);	
  }
  
  userDadosGuardados(){

    this.storage.get('QualUser').then((val) => {
      this.IdUserQual = val;
    })
    this.storage.get('QualNome').then((val) => {
      this.NomeUserQual = val;
    })
    this.storage.get('QualSobrenome').then((val) => {
      this.SobrenomeUserQual = val;
    })
    this.storage.get('QualEmail').then((val) => {
      this.EmailUserQual = val;
    })
    this.storage.get('QualFone').then((val) => {
      this.FoneUserQual = val;
    })
    
  } 

  public solicitar() {
    
    this.showLoading();

		this.isenabled=false; 

    var link = 'http://app.progettoapp.com.br/midias-lider/eventos_cadastrar.php';
    var myData = JSON.stringify(
      { 
        ideventoForm: this.data.ideventoForm, NomeForm: this.data.NomeForm, SobrenomeForm: this.data.SobrenomeForm,
        EmailForm: this.data.EmailForm, FoneForm: this.data.FoneForm, iduserForm: this.data.Id_UserQual, ValorForm: this.data.ValorForm, 
        FormaPag: this.data.FormaPag
      }
    );
    this.http.post(link, myData)
        .subscribe(data => {

           var dadosLogin =  JSON.parse(data["_body"]); 
           console.log(dadosLogin)  
                                    
              if(dadosLogin.rows[0].CadastroSituacao == '1'){

                let alert = this.alertCtrl.create({
                  title: 'Sucesso!',
                  subTitle: "Solicitação foi enviada e em breve nós entraremos em contato.",
                  buttons: ['OK']
                });
                alert.present();

                this.navCtrl.setRoot(EventosPage);

              }else{

                this.showError("Todos os campos com * devem ser preenchidos!");
                //this.BotaoCadastrar = "Cadastrar";   

              }

          this.isenabled=true; 
          
        },
        error => {
          this.showError(error);
        }); 
  } 

  showLoading() {

    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      dismissOnPageChange: true
    });
    this.loading.present();

  }

  showError(text) {

    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,      
      title: 'Aviso',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();

  } 

  abrirPaginaHome() {
		this.navCtrl.setRoot(TimelinePage);
	}
	abrirPaginaTitulos() {
		this.navCtrl.setRoot(TitulosPage);
	}
	abrirPaginaPublicacoes() {
		this.navCtrl.setRoot(TitulosLivrosPage);
	}
	abrirPaginaPl() {
		this.navCtrl.setRoot(RevistaPlPage);
	}
	abrirPaginaOntoarte() {
		this.navCtrl.setRoot(OntoartePage);
	}
	abrirPaginaAovivo() {
		this.navCtrl.setRoot(AovivoVideosPage);
	}
	abrirPaginaAreaUsuarioRestrita() {
		this.navCtrl.setRoot(AreaUsuarioRestritaPage);
	}
	abrirPaginaEventos() {
		this.navCtrl.setRoot(EventosPage);
	}
	abrirPaginaBusca() {
		this.navCtrl.setRoot(BuscaPage);
	}
}
