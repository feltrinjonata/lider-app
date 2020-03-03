import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { BuscaPage } from '../busca/busca';
import { EventosPage } from '../eventos/eventos';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { OntoartePage } from '../ontoarte/ontoarte';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { TitulosPage } from '../titulos/titulos';
import { HomePage } from '../home/home';
import { VerlivroPage } from '../verlivro/verlivro';
import { VerPlPage } from '../ver-pl/ver-pl';
import { PlListaPage } from '../pl-lista/pl-lista';
import { LivrosPage } from '../livros/livros';
import { VideosPage } from '../videos/videos';
import { OntoarteVerPage } from '../ontoarte-ver/ontoarte-ver';
import { Storage } from '@ionic/storage';
import { EditarMinhaPlPage } from '../editar-minha-pl/editar-minha-pl';
import { MinhaListaPage } from '../minha-lista/minha-lista';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-minha-lista-pl',
  templateUrl: 'minha-lista-pl.html',
})
export class MinhaListaPlPage {

  data:any ={};
  item = []; 

  MinhaListaItens = []; 
  ListaItens = [];
  api : string =  'http://app.progettoapp.com.br/arquivos/r';
  
  constructor
  (
    public loadingCtrl: LoadingController, public modalCtrl : ModalController, private Storage: Storage,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController
  ){

    this. getDados();  
      
  }
  getDados() {

    this.Storage.ready().then(()=>{
      this.Storage.get("MinhaListaPl").then( (data)=>{

        this.MinhaListaItens = data;
        //console.log(this.MinhaListaItens);

        if(data==null || data.length==0){

          //this.showEmptCartMessage= true;   
        
        }else{
          
          this.MinhaListaItens.forEach( (item, index)=>{
            this.ListaItens = item;
          })
          
        }
        /*
        if(this.LivrosItens.length > 0){
          this.LivrosItens.forEach( (item, index)=>{
            this.total = this.total + (item.product.price * item.qty);
          })
        } else {
          this.showEmptCartMessage= true;
        }
        */
      })
    })

  }

  abriMinhaLista(item: string){ 
    console.log(item);
    this.navCtrl.push(PlListaPage, { item } ); 
  }  

  AbrirEditarPl(){
    this.navCtrl.push(EditarMinhaPlPage);
  }

  abrirMinhaListaHome(){
    this.navCtrl.setRoot(MinhaListaPage); 
  }

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaTitulos(){
    this.navCtrl.setRoot(TitulosPage);
  }
  abrirPaginaPublicacoes(){
    this.navCtrl.setRoot(TitulosLivrosPage);
  }
  abrirPaginaPl(){
    this.navCtrl.setRoot(RevistaPlPage);
  }
  abrirPaginaOntoarte(){
    this.navCtrl.setRoot(OntoartePage);
  }  
  abrirPaginaAovivo(){
    this.navCtrl.setRoot(AovivoVideosPage);
  } 
  abrirPaginaAreaUsuarioRestrita(){
    this.navCtrl.setRoot(AreaUsuarioRestritaPage);
  } 
  abrirPaginaEventos(){
    this.navCtrl.setRoot(EventosPage);
  }  
  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage);
  }

}