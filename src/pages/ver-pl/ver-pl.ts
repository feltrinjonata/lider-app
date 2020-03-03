import { Component } from '@angular/core'; 
import { NavParams, NavController, Platform, LoadingController, ModalController, ToastController } from 'ionic-angular'; 
import { DomSanitizer } from '@angular/platform-browser';

import { SocialSharing } from '@ionic-native/social-sharing';

import { LojaVerPage } from '../loja-ver/loja-ver';
import { LojaModalPage } from '../loja-modal/loja-modal';

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
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

@Component({
  selector: 'page-ver-pl',
  templateUrl: 'ver-pl.html',
})
export class VerPlPage {

  pdfLink:any;
  data:any ={};
  item = [];
  urlVideo:any='';
  api : string =  'http://app.progettoapp.com.br/arquivos/r';

  constructor(
    private socialSharing: SocialSharing,
    public navCtrl: NavController, 
    private sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public service : DadosUsuarioProvider,
    public modalCtrl : ModalController,   
    public toastCtrl : ToastController
  ){
    
    this.item = this.navParams.get('item');

    this.service.enviaContador('pl', this.item['idpl']).subscribe();
    
    this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl('http://docs.google.com/gview?embedded=true&widget=false&efh=false&headers=false&url=' + this.api + '/' + this.item['Caminho'] + '/' + this.item['Pasta'] + '/' + this.item['Arquivo']);

  }

   // --- COMPARTILHAR --- // 
    //compilemsg(index):string{
      //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
      //return msg.concat(" \n sent from my awesome app");
    //}
    regularShare(msg, assunto, file, link){
      //var msg = this.compilemsg(msg);
      this.socialSharing.share(msg, assunto, file, link);
    }

  ionViewDidLoad(){

  }
  selecionaLoja(item: string) {     
    this.navCtrl.push(LojaModalPage,{ item });
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
