import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ViewController, ToastController, Loading, MenuController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
import { PrivacidadeVerPage } from '../privacidade-ver/privacidade-ver';
import { PrivacidadePage } from '../privacidade/privacidade';
import { PlanosPage } from '../planos/planos';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';
import { MudarPlanoUserPage } from '../mudar-plano-user/mudar-plano-user';

@Component({
  selector: 'page-mudar-cobranca',
  templateUrl: 'mudar-cobranca.html',
})
export class MudarCobrancaPage {

  relPrivacidade = '';
  
  data: any = {};  
  data2: any = {}; 
  data3: any = {};  
  
  //isenabled:boolean = true;
  QualNivelBundle : any = [];

  loading: Loading;

  QualNivel : any = [];
  QualNivelNome : any = [];
  QualNivelValor : any = []; 
  BotaoCadastrar : any = 'Cadastrar';

  IdUserQual : any = {}; 
  PlanoUserQual : any = {};

  aceitotermo : any = [];

  usuario : any;

  constructor(
    public navCtrl: NavController, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl : ModalController,
    public viewCtrl : ViewController,
    private iap: InAppPurchase,   
    public storage:Storage, 
    public menu: MenuController,
    private http: Http, 
    private alertCtrl: AlertController, 
    private iab: InAppBrowser,
    public platform: Platform,   
    private toastCtrl: ToastController,  
  ){

		this.getDados();

  }

  ionViewDidLoad() {

  }

  concordo(){

    this.navCtrl.push(MudarPlanoUserPage);

    // atualiza no banco
    let url = 'http://app.progettoapp.com.br/midias-lider/termos_aceita.php' 

    let data = {
      usuario_qual: this.IdUserQual,
      aceitouTermos: '6'
    }

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post( url, data, options )
      .subscribe(response => { },
      error => {
        console.log(error);
      })    
  }

  getDados() {
    this.service.getPrivacidade()
    .subscribe(
      data=> this.relPrivacidade = data.rows,
      err=> console.log(err)
    );
  }

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaAovivo(){
    this.navCtrl.setRoot(AovivoVideosPage);
  } 
  abrirPaginaEventos(){
    this.navCtrl.setRoot(EventosPage);
  }  
  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage);
  }  
  
}
