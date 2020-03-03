import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  selector: 'page-minha-conta-pagamento',
  templateUrl: 'minha-conta-pagamento.html',
})
export class MinhaContaPagamentoPage {

  abrir : any;
  token_geral : any = '4111111111111111';
  IdUserQual : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    public storage:Storage,
    private http: Http,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController  
  ) {

    this.storage.get('QualUser').then((value) => {
      this.abrir = this.sanitizer.bypassSecurityTrustResourceUrl('http://app.progettoapp.com.br/midias-lider/Itunes/rest/index.php?c_u=' + value + '&c_t=' + this.token_geral);
      this.IdUserQual = value;
    });

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
  MeusPagamentos(){
    this.navCtrl.push(MinhaContaPagamentoPage);
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