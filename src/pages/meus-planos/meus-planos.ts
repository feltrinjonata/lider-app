import { Http } from '@angular/http';
import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

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
import { MinhaListaPublicacoesPage } from '../minha-lista-publicacoes/minha-lista-publicacoes';
import { MinhaListaPlPage } from '../minha-lista-pl/minha-lista-pl';
import { MinhaListaOntoartePage } from '../minha-lista-ontoarte/minha-lista-ontoarte';
import { MinhaListaAulasPage } from './../minha-lista-aulas/minha-lista-aulas';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-meus-planos',
  templateUrl: 'meus-planos.html',
})
export class MeusPlanosPage {
  
  data:any ={};
  
  relPlanos : any;  

  relnovidades = ''; 
  qtdePublicacoes: any;
  numerosNovidades: any;
  numerosNovidadesAtual: any;

  constructor
  (
    public loadingCtrl: LoadingController, private Storage: Storage, public service: DadosUsuarioProvider,
    public navCtrl: NavController, public navParams: NavParams, private http:Http,
    public storage: Storage, private toastCtrl: ToastController
  ){
    
    this.getDados();    
    this.getPlanos2();

  }
  getDados() {

  }
  getPlanos2() {
    //retorno de Dados
    this.service.getPlanos()
    .subscribe(
        data=> this.relPlanos = data.rows,
        err=> console.log(err)        
    );
  }
  selecionarPlano(idplano, nomeplano, valorplano){

    this.storage.set("QualNivel", idplano).then( ()=>{} ); 
    this.storage.set("QualNivelNome", nomeplano).then( ()=>{} ); 
    this.storage.set("QualNivelValor", valorplano).then( ()=>{} );    

    this.toastCtrl.create({
      message: "Plano selecionado!",
      duration: 3000,
      position: 'middle',
    }).present();    

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

