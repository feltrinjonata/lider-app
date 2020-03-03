import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { Storage } from '@ionic/storage';

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
import { PrivacidadeVerPage } from '../privacidade-ver/privacidade-ver';
import { AssinarPage } from '../assinar/assinar';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-privacidade',
  templateUrl: 'privacidade.html',
})
export class PrivacidadePage {

  data:any ={};
  relPrivacidade = '';
  QualNivelBundleLeu : any = {};

  constructor(
    public navCtrl: NavController, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl : ModalController,
    public viewCtrl : ViewController,
    public storage:Storage,  
  ){

    this.getDados();
		this.storage.get('QualNivelBundle').then((val) => {
      this.QualNivelBundleLeu = val;   
    });  
 
  }

  ionViewDidLoad() {

  }

  concordo(){
    this.navCtrl.push(AssinarPage);
  }

  getDados() {
    this.service.getPrivacidade()
    .subscribe(
      data=> this.relPrivacidade = data.rows,
      err=> console.log(err)
    );
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }
  abrirPrivacidade(item) {  
    this.navCtrl.push(PrivacidadeVerPage, { item });
  } 

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaAovivo(){
    this.navCtrl.setRoot(AovivoVideosPage);
  } 
  abrirPaginaEventos(){
    this.navCtrl.setRoot(EventosPage);
  }  
  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage);
  }  
  
}
