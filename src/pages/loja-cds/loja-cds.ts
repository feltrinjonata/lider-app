import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { BuscaPage } from '../busca/busca';
import { LivrosPage } from '../livros/livros';
import { EventosPage } from '../eventos/eventos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { LojaVerPage } from '../loja-ver/loja-ver';
import { LojaModalPage } from '../loja-modal/loja-modal';
import { DicionarioVerPage } from '../dicionario-ver/dicionario-ver';
import { LojaSouvenirsPage } from '../loja-souvenirs/loja-souvenirs';
import { LojaRevistaPage } from '../loja-revista/loja-revista';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { LojaPage } from '../loja/loja';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-loja-cds',
  templateUrl: 'loja-cds.html',
})
export class LojaCdsPage {

  data:any ={};
  relBooks = '';
  relOutro = '';

  constructor(
    public navCtrl: NavController, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl : ModalController
  ) {

      this. getDados1();
      this. getDados2();

  }

  api : string =  'http://app.progettoapp.com.br/arquivos/r';

  getDados1() {
    //retorno de Dados
    this.service.getAlbuns()
    .subscribe(
        data=> this.relBooks = data.rows,
        err=> console.log(err)
    );
  }
  getDados2() {
    //retorno de Dados
    this.service.getAlbuns()
    .subscribe(
        data=> this.relOutro = data.rows,
        err=> console.log(err)
    );
  }

  abrirModalLoja(item: string) {  
    this.navCtrl.push(LojaModalPage, {
    item
      });
  } 

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }

  abrirLojaLivro(){
    this.navCtrl.setRoot(LojaPage);
  }
  abrirLojaRevista(){
    this.navCtrl.setRoot(LojaRevistaPage);
  }
  abrirLojaCds(){
    this.navCtrl.setRoot(LojaCdsPage);
  }
  abrirLojaSouvenirs(){
    this.navCtrl.setRoot(LojaSouvenirsPage);
  }

  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage);
  }

}
