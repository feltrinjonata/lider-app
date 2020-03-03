import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

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
import { MinhaContaPagamentoPage } from '../minha-conta-pagamento/minha-conta-pagamento';
import { PlanosCobrancaPage } from '../planos-cobranca/planos-cobranca';
import { PlanosContaPage } from '../planos-conta/planos-conta';
import { PlanosPage } from '../planos/planos';
import { MinhaContaCobrancasPage } from '../minha-conta-cobrancas/minha-conta-cobrancas';
import { PlanosAndroidPage } from '../planos-android/planos-android';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';
import { PlanosAndroidMudarPage } from '../planos-android-mudar/planos-android-mudar';
import { MudarPlanoUserPage } from '../mudar-plano-user/mudar-plano-user';
import { MudarPlanosAndroidPage } from '../mudar-planos-android/mudar-planos-android';
import { MudarCobrancaPage } from '../mudar-cobranca/mudar-cobranca';

@Component({
  selector: 'page-minha-conta2',
  templateUrl: 'minha-conta2.html',
})
export class MinhaConta2Page {
  
  options: InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    closebuttoncaption: '(x) Fechar',    
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'yes',
    shouldPauseOnSuspend : 'yes', //Android only 
    footer: 'yes',
    toolbar: 'yes', //iOS only     
    toolbarcolor: '#fbfbfb',
    toolbartranslucent: 'yes',
    toolbarposition: 'top',
    disallowoverscroll : 'no', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'fullscreen', //iOS only 
    hidenavigationbuttons: 'yes',
    fullscreen : 'yes',//Windows only  
  }

  IdUserQual : any = {}; 
  EmailUserQual : any= {};
  NomeUserQual : any = {};
  SobrenomeUserQual : any = {};  
  NivelUserQual : any = {};
  PlanoUserQual : any = {};
  FotoUserQual : any = {};

  QualNivelValor : any = {};

  EnderecoUserQual : any = {};  
  NumeroUserQual : any = {};
  BairroUserQual : any = {};
  ComplementoUserQual : any = {};
  CidadeUserQual : any = {};  
  EstadoUserQual : any = {};
  PaisUserQual : any = {};
  CepUserQual : any = {};
 
  relPlanos : any;  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    private iab: InAppBrowser,
    private alertCtrl: AlertController, 
    public modalCtrl : ModalController,
    public viewCtrl : ViewController,
    private http: Http,
    public service: DadosUsuarioProvider, 
  ){
    
    this.userDadosGuardados();
    this.getPlano();    
    
  }

  ionViewDidLoad() {
    this.storage.set('AssinarClique', '1');
    this.userDadosGuardados();
  } 
  
  getPlano() {
    this.service.getPlanosQual()
    .subscribe(
        data=> this.relPlanos = data.rows,        
    );
  } 
 
  mudarPlano() {      

    // ios
    //this.navCtrl.push(MudarCobrancaPage);
    this.navCtrl.push(MudarPlanoUserPage);

    // android
    //this.navCtrl.push(MudarPlanosAndroidPage);
    
  } 
  VerCobranca() {       
    this.navCtrl.push(MinhaContaCobrancasPage); 
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
    this.storage.get('QualNivelNome').then((val) => {
      this.PlanoUserQual = val;  
    })
    this.storage.get('QualNivelValor').then((val) => {
      this.QualNivelValor = val;  
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

  CancelamentoConta(){
    
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,                  
      title: 'Cancelar assinatura',
      message: 'O encerramento da sua conta é feito através do seu Itunes.',
      buttons: [            
        {
          text: 'Ok',
          handler: () => {
            //loading.onDidDismiss(() => { });
          }
        }
      ]
    })
    alert.present();  

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
  public MeusPagamentos(){
    //this.navCtrl.push(MinhaContaPagamentoPage);
    let url = 'http://app.progettoapp.com.br/novo-cadastro';
    const browser = this.iab.create(url, '_blank', this.options);    
    browser.show();   
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
