import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

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
import { LojaCdsPage } from '../loja-cds/loja-cds';
import { LojaSouvenirsPage } from '../loja-souvenirs/loja-souvenirs';
import { LojaRevistaPage } from '../loja-revista/loja-revista';
import { CarrinhoPage } from '../carrinho/carrinho';
import { Storage } from '@ionic/storage';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-loja',
  templateUrl: 'loja.html',
})
export class LojaPage {

  @ViewChild('productSlides') productSlides: Slides;

  data:any ={};
  relLivros = '';
  relLivrosCats = '';

  qtCarrinho:any;

  constructor(
    public navCtrl: NavController, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl : ModalController,
    private Storage: Storage
  ) {

    this.getDados();
    this.getDadosCat();

    //qt carrinho
    this.Storage.ready().then(()=>{
      this.Storage.get("ComprasCarrinho").then( (data)=>{

        this.qtCarrinho = data.length-1;

      })
    })
    
  }

  ionViewDidLoad() {
    
    setInterval(()=> {
    
        if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);
        this.productSlides.slideNext();
        
    },3000)

  }

  api : string =  'http://app.progettoapp.com.br/arquivos/r';

  getDados() {
    //retorno de Dados
    this.service.getLivros()
    .subscribe(
        data=> this.relLivros = data.rows,
        err=> console.log(err)
    );
  }
  getDadosCat() {
    //retorno de Dados
    this.service.getLivrosCategorias()
    .subscribe(
        data=> this.relLivrosCats = data.rows,
        err=> console.log(err)        
    );
  }

  abrirModalLoja(item) {  
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
