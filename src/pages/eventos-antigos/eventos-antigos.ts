import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { EventosAntigosVerPage } from '../eventos-antigos-ver/eventos-antigos-ver';

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
  selector: 'page-eventos-antigos',
  templateUrl: 'eventos-antigos.html',
})
export class EventosAntigosPage {

	data:any ={};
	pet = '';
	
	relEventos = '';
	api : string =  'http://app.progettoapp.com.br/arquivos/r';
	
	relnovidades = ''; 
	qtdePublicacoes: any;
	numerosNovidades: any;
	numerosNovidadesAtual: any;

	constructor
	(
		private socialSharing: SocialSharing,
		public http: Http, public navCtrl: NavController, private Storage: Storage, 
		public platform: Platform, public service : DadosUsuarioProvider, private iab: InAppBrowser,
		public loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams
	) {
		
		this.pet = "proximos";
		this.getDados();
	}

	getDados(){
		this.service.getEventosAntigos()
		.subscribe(
			data=> this.relEventos = data.rows,
			err=> console.log(err)
		);
	} 
  ionViewWillEnter() {
    this.service.getNovidades().subscribe(
      data => {
        this.relnovidades = data.rows;        
        this.Storage.get('relNovidades').then((val) => {
          if(val != null ){
            this.numerosNovidades = val.length;
          }else{
            this.Storage.set('relNovidades', this.relnovidades)
          }
        });
        this.Storage.get('numeroPublicacoes').then((val) => {
          if(val != null){
            this.numerosNovidadesAtual = val;
          }else{
            this.Storage.set('numeroPublicacoes', this.relnovidades.length)
          }
        });
        setTimeout(() => {

          if(this.relnovidades.length > this.numerosNovidadesAtual){
            this.qtdePublicacoes = this.relnovidades.length - this.numerosNovidadesAtual;
          }
        }, 500);

      },
      err => console.log(err)
    );
  }
		
	selecionarEventoAntigo(item: string) {      
    	this.navCtrl.push(EventosAntigosVerPage, { item } );
	} 

	abrirPaginaProximo() {
		this.navCtrl.setRoot(EventosPage);
	}  
	abrirPaginaAnterior() {
		this.navCtrl.setRoot(EventosAntigosPage);
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
