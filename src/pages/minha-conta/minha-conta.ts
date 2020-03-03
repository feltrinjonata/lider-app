import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
import { MeusPlanosPage } from '../meus-planos/meus-planos';
import { MinhaContaEnderecoPage } from '../minha-conta-endereco/minha-conta-endereco';
import { MinhaContaDadosPage } from '../minha-conta-dados/minha-conta-dados';
import { MinhaContaFotoPage } from '../minha-conta-foto/minha-conta-foto';
import { MinhaContaFoto2Page } from '../minha-conta-foto2/minha-conta-foto2';
import { MinhaContaSenhaPage } from '../minha-conta-senha/minha-conta-senha';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html',
})
export class MinhaContaPage {
  
  IdUserQual : any = {}; 
  EmailUserQual : any= {};
  NomeUserQual : any = {};
  SobrenomeUserQual : any = {};  
  NivelUserQual : any = {};
  PlanoUserQual : any = {};
  FotoUserQual : any = {};

  EnderecoUserQual : any = {};  
  NumeroUserQual : any = {};
  BairroUserQual : any = {};
  ComplementoUserQual : any = {};
  CidadeUserQual : any = {};  
  EstadoUserQual : any = {};
  PaisUserQual : any = {};
  CepUserQual : any = {};


  constructor
  (
    public navCtrl: NavController, public navParams: NavParams,
    public storage:Storage
  ){

    this.userDadosGuardados();

  }

  ionViewDidLoad() {

  }

  userDadosGuardados(){
    this.storage.get('QualUser').then((val) => {
      this.IdUserQual = val;
    })
    this.storage.get('QualEmail').then((val) => {
      this.EmailUserQual = val;
    })
    this.storage.get('QualNome').then((val) => {
      this.NomeUserQual = val;
    })
    this.storage.get('QualSobrenome').then((val) => {
      this.SobrenomeUserQual = val;
    }) 
    this.storage.get('QualNivel').then((val) => {
      this.NivelUserQual = val;
    })
    this.storage.get('QualPlano').then((val) => {
      this.PlanoUserQual = val;  
    })
    this.storage.get('QualFoto').then((val) => {
      this.FotoUserQual = val;
    })

    this.storage.get('EnderecoUserFinal').then((val) => {
      this.EnderecoUserQual = val;
    })
    this.storage.get('NumeroUserFinal').then((val) => {
      this.NumeroUserQual = val;
    })
    this.storage.get('BairroUserFinal').then((val) => {
      this.BairroUserQual = val;
    })
    this.storage.get('ComplementoUserFinal').then((val) => {
      this.ComplementoUserQual = val;
    })    
    this.storage.get('CidadeUserFinal').then((val) => {
      this.CidadeUserQual = val;
    })
    this.storage.get('EstadoUserFinal').then((val) => {
      this.EstadoUserQual = val;
    })                
    this.storage.get('PaisUserFinal').then((val) => {
      this.PaisUserQual = val;
    })   
    this.storage.get('CepUserFinal').then((val) => {
      this.CepUserQual = val;
    })   

  } 

  mudarDados(){
    this.navCtrl.push(MinhaContaDadosPage);
  }
  mudarSenha(){
    this.navCtrl.push(MinhaContaSenhaPage);
  }  
  mudarFoto(){
    this.navCtrl.push(MinhaContaFotoPage);
    //this.navCtrl.push(MinhaContaFoto2Page);
  }
  mudarEndereco(){
    this.navCtrl.push(MinhaContaEnderecoPage);
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
