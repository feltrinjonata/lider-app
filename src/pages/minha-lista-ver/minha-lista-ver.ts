import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { VerlivroPage } from '../verlivro/verlivro';
import { VerPlPage } from '../ver-pl/ver-pl';
import { PlListaPage } from '../pl-lista/pl-lista';
import { LivrosPage } from '../livros/livros';
import { VideosPage } from '../videos/videos';

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
  selector: 'page-minha-lista-ver',
  templateUrl: 'minha-lista-ver.html',
})
export class MinhaListaVerPage {

  data:any ={};
  rel1 = '';
  rel2 = '';
  rel3 = '';
  item = []; 

  LivrosItens = []; 
  plItens = []; 
  VideoItens = []; 
  OntoItens = []; 

  constructor(
    public loadingCtrl: LoadingController,
    private Storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this. getDados();  
      
  }
  getDados() {

    this.Storage.ready().then(()=>{
      this.Storage.get("MinhaListaLivros").then( (data)=>{
        this.LivrosItens=data;
        console.log(this.LivrosItens);

        if(data==null || data.length==0){
          //this.showEmptCartMessage= true;   
        } else {
          this.LivrosItens.forEach( (item, index)=>{
            this.rel1 = item;
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

    this.Storage.ready().then(()=>{
      this.Storage.get("MinhaListaPl").then( (data)=>{
        this.plItens=data;
        console.log(this.plItens);

        if(data==null || data.length==0){
          //this.showEmptCartMessage= true;   
        } else {
          this.plItens.forEach( (item, index)=>{
            this.rel2 = item;
          })
          
        }
        /*
        if(this.plItens.length > 0){
          this.plItens.forEach( (item, index)=>{
            this.total = this.total + (item.product.price * item.qty);
          })
        } else {
          this.showEmptCartMessage= true;
        }
        */
      })
    })

    this.Storage.ready().then(()=>{
      this.Storage.get("MinhaListaPl").then( (data)=>{
        this.VideoItens=data;
        console.log(this.VideoItens);

        if(data==null || data.length==0){
          //this.showEmptCartMessage= true;   
        } else {
          this.VideoItens.forEach( (item, index)=>{
            this.rel2 = item;
          })
          
        }
        /*
        if(this.VideoItens.length > 0){
          this.VideoItens.forEach( (item, index)=>{
            this.total = this.total + (item.product.price * item.qty);
          })
        } else {
          this.showEmptCartMessage= true;
        }
        */
      })
    })

    this.Storage.ready().then(()=>{
      this.Storage.get("MinhaListaPl").then( (data)=>{
        this.OntoItens=data;
        console.log(this.OntoItens);

        if(data==null || data.length==0){
          //this.showEmptCartMessage= true;   
        } else {
          this.OntoItens.forEach( (item, index)=>{
            this.rel2 = item;
          })
          
        }
        /*
        if(this.OntoItens.length > 0){
          this.OntoItens.forEach( (item, index)=>{
            this.total = this.total + (item.product.price * item.qty);
          })
        } else {
          this.showEmptCartMessage= true;
        }
        */
      })
    })
  }

  abriLivro(item: string) { 
    let loader = this.loadingCtrl.create({
    content: "Carregando",
    duration: 3000
  });
  loader.present();      
    this.navCtrl.push(LivrosPage,{
      item
      });
  }  
  abriPl(item: string) { 
    let loader = this.loadingCtrl.create({
    content: "Carregando",
    duration: 3000
  });
  loader.present();      
    this.navCtrl.push(PlListaPage,{
      item
      });
  }  
  abriVideo(item: string) { 
    let loader = this.loadingCtrl.create({
    content: "Carregando",
    duration: 3000
  });
  loader.present();      
    this.navCtrl.push(VideosPage,{
      item
      });
  }  
  abriOnto(item: string) { 
    let loader = this.loadingCtrl.create({
    content: "Carregando",
    duration: 3000
  });
  loader.present();      
    this.navCtrl.push(OntoarteVerPage,{
      item
      });
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
