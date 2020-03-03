import { Storage } from '@ionic/storage';
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
import { LojaRevistaPage } from '../loja-revista/loja-revista';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { LojaPage } from '../loja/loja';
import { LojaCdsPage } from '../loja-cds/loja-cds';
import { CarrinhoPage } from '../carrinho/carrinho';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-loja-souvenirs',
  templateUrl: 'loja-souvenirs.html',
})
export class LojaSouvenirsPage {

  data:any ={};
  relAlbuns = '';

  qtCarrinho:any;

  constructor(
    public navCtrl: NavController, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl : ModalController,
    private Storage: Storage
  ){

    this.getAlbunsFor();

    //qt carrinho
    this.Storage.ready().then(()=>{
      this.Storage.get("ComprasCarrinho").then( (data)=>{

        this.qtCarrinho = data.length-1;

      })
    })

  }

  api : string =  'http://app.progettoapp.com.br/arquivos/r';

  getAlbunsFor() {
    //retorno de Dados
    this.service.getAlbuns()
    .subscribe(
        data=> {
          this.relAlbuns = data.rows;
          console.log('album', this.relAlbuns);
        },
        err=> console.log(err)
    );
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