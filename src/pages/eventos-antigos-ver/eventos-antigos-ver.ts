import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

import { EventosFotoVerPage } from '../eventos-foto-ver/eventos-foto-ver';

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
  selector: 'page-eventos-antigos-ver',
  templateUrl: 'eventos-antigos-ver.html',
})
export class EventosAntigosVerPage {
	
	@ViewChild('productSlides') productSlides: Slides;

	relEventos = '';
	relEventosFotos = '';
	item = []; 
	data:any = {};
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
		this.getDadosFotos();
  }

  ionViewDidLoad() {
    
    setInterval(()=> {
    
        if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);
        this.productSlides.slideNext();
        
    },3000)

  }
	 
	getDados() {
		this.service.getEventosAntigos();
		this.item = this.navParams.get('item');
	}
  getDadosFotos() {
    //retorno de Dados
    this.service.getEventosFotos()
    .subscribe(
        data=> this.relEventosFotos = data.rows,
        err=> console.log(err)        
    );
  }
	AbrirFoto(item: string) {      
		this.navCtrl.push(EventosFotoVerPage, { item } );
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
