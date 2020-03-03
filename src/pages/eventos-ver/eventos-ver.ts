import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { EventosFormPage } from '../eventos-form/eventos-form';
import { EventoInfoVerPage } from '../evento-info-ver/evento-info-ver';

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
  selector: 'page-eventos-ver',
  templateUrl: 'eventos-ver.html',
})
export class EventosVerPage {
	
  shownGroup = null;

	relEventos = '';
	relEventosValores = '';
	item = []; 
	itemValores = []; 
	data : any = {};
	ValorSelecionado : any = {};
	imgQualSeta : any = {};

	api : string =  'http://app.progettoapp.com.br/arquivos/r';
	
  constructor
  (
    private socialSharing: SocialSharing,
    public http: Http, public navCtrl: NavController, private Storage: Storage, 
    public platform: Platform, public service : DadosUsuarioProvider, private iab: InAppBrowser,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams
  ){
    this.relEventos;
		this.getDados();
		this.relEventosValores;
		this.getDadosEventosValores();
		this.imgQualSeta = 'eventos-seta';
		this.ValorSelecionado;
		console.log('bernardo: ', this.ValorSelecionado);	
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
			this.shownGroup = null;
			this.imgQualSeta = 'eventos-seta';
    } else {
			this.shownGroup = group;
			this.imgQualSeta = 'eventos-seta2';				
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  ionViewDidLoad() {

  }

  getDadosEventosValores(){
    this.service.getEventosValores()
    .subscribe(
        data=> this.relEventosValores = data.rows,
        err=> console.log(err)
    );
} 	
	getDados() {
		this.service.getEventos();
		this.item = this.navParams.get('item');
	}
  selecionaInfo(item: string) {      
    this.navCtrl.push( EventoInfoVerPage, { item } );
	}	
  selecionaForm(item: string) {   
		this.ValorSelecionado;		   
    this.navCtrl.push( EventosFormPage, { item, ValorSelecionado: this.ValorSelecionado } );
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
