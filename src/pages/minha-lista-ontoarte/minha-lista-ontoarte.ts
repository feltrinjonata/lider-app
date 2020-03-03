import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Audios2Page } from '../audios2/audios2';
import { Storage } from '@ionic/storage';
import { EditarMinhaOntoartePage } from '../editar-minha-ontoarte/editar-minha-ontoarte';
import { MinhaListaAudioOntoartePage } from '../minha-lista-audio-ontoarte/minha-lista-audio-ontoarte';
import { MinhaListaPage } from '../minha-lista/minha-lista';
import { MinhaListaConcertoPage } from '../minha-lista-concerto/minha-lista-concerto';
import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-minha-lista-ontoarte',
  templateUrl: 'minha-lista-ontoarte.html',
})
export class MinhaListaOntoartePage {
  data:any ={};
  item = []; 

  MinhaListaItens = []; 
  ListaItens = [];

  constructor
  (
    public loadingCtrl: LoadingController, public modalCtrl : ModalController, private Storage: Storage,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController
  ){

    this. getDados();  
      
  }

  api: string = 'http://app.progettoapp.com.br/arquivos/r';

  getDados() {

    this.Storage.ready().then(()=>{
      this.Storage.get("MinhaListaAlbum").then( (data)=>{

        this.MinhaListaItens = data;
        console.log(this.MinhaListaItens);

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
    //console.log(item);
    this.navCtrl.setRoot(Audios2Page, { item } ); 
  }  

  AbrirEditarOntoarte(){
    this.navCtrl.push(EditarMinhaOntoartePage);
  }

  abrirMinhaListaHome(){
    this.navCtrl.setRoot(MinhaListaPage); 
  }
  abrirMinhaListaAlbuns() {
    this.navCtrl.push(MinhaListaOntoartePage);
  }
  abrirMinhaListaAudio(){
    this.navCtrl.push(MinhaListaAudioOntoartePage); 
  }
  abrirMinhaListaConcertos(){
    this.navCtrl.push(MinhaListaConcertoPage); 
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
