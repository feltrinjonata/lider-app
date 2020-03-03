import { DadosUsuarioProvider } from './../../providers/dados-usuario/dados-usuario';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { CarrinhoPage } from '../carrinho/carrinho';
import { LojaSouvenirsPage } from '../loja-souvenirs/loja-souvenirs';
import { LojaRevistaPage } from '../loja-revista/loja-revista';
import { LojaPage } from '../loja/loja';
import { LojaModalPage } from '../loja-modal/loja-modal';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-loja-ver',
  templateUrl: 'loja-ver.html',
})
export class LojaVerPage {

  constructor(
    public navCtrl: NavController, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl : ModalController
  ) {

  }

  abrirModalLoja(item: string) {  
    this.navCtrl.push(LojaModalPage, { item });
  } 

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage);
  }

  abrirLojaLivro(){
    this.navCtrl.setRoot(LojaPage);
  }
  abrirLojaRevista(){
    this.navCtrl.setRoot(LojaRevistaPage);
  }
  abrirLojaSouvenirs(){
    this.navCtrl.setRoot(LojaSouvenirsPage);
  }
  abrirCarrinho(){
    this.navCtrl.push(CarrinhoPage);
  }  

}
