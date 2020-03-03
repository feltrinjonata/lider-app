import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, App, MenuController, ToastController} from 'ionic-angular';
//import { Http, Headers } from '@angular/http';
//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AudioServiceProvider } from './../../providers/audio-service/audio-service';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
//import { BrowserTab } from '@ionic-native/browser-tab';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { AudiosPage } from '../audios/audios';
import { DicionarioPage } from '../dicionario/dicionario';
import { EsqueceuSenhaPage } from '../esqueceu-senha/esqueceu-senha';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { CarregandoPage } from '../carregando/carregando';
import { AssinarPage } from '../assinar/assinar';
import { CadastroSistemaPage } from '../cadastro-sistema/cadastro-sistema';
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
import { TitulosPage } from '../titulos/titulos';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-sair',
  templateUrl: 'sair.html',
})
export class SairPage {

  relnovidades = ''; 
  qtdePublicacoes: any;
  numerosNovidades: any;
  numerosNovidadesAtual: any;

  DeviceIDQual : any = {};
  UserIDQual : any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toast: ToastController,    
    public http: Http,
    //private http: HttpClient,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    public storage:Storage, 
    public menu: MenuController,
    public audioService: AudioServiceProvider,
    public service: DadosUsuarioProvider,    
    private iab: InAppBrowser,
    //private browserTab: BrowserTab
  ){

    this.storage.get('DeviceID').then((val) => {
      this.DeviceIDQual = val;
    })
    this.storage.get('QualEmail').then((val) => {
      this.enviaSair(val);
    })

  }
  ionViewDidLoad() {

    this.storage.get('Status').then((val) => {

      if(val == 'Logado'){ 

        this.storage.set('Status', '');
        this.storage.remove('dataMsg');
        this.storage.remove('tkApp_Lider');
        this.storage.remove('tkvApp_Lider');
        
        this.storage.remove('QualUser');
        //this.storage.remove('QualEmail');

        this.storage.remove('QualNome');
        this.storage.remove('QualSobrenome');
        this.storage.remove('QualNivel');
        this.storage.remove('QualplanoSel');
        this.storage.remove('QualPlano');
        this.storage.remove('QualFoto');
        this.storage.remove('QualFone');

        this.storage.remove('EnderecoUserFinal');
        this.storage.remove('NumeroUserFinal');
        this.storage.remove('BairroUserFinal');
        this.storage.remove('ComplementoUserFinal');
        this.storage.remove('CidadeUserFinal');
        this.storage.remove('EstadoUserFinal');
        this.storage.remove('PaisUserFinal');
        this.storage.remove('CepUserFinal');          

        this.storage.remove('ComprasCarrinho');
        this.storage.remove('QualNivelBundle');
        this.storage.remove('QualNivelNome');
        this.storage.remove('QualNivelValor');        

      }else{ 

        this.storage.set('Status', '');
        this.storage.remove('dataMsg');
        this.storage.remove('tkApp_Lider');
        this.storage.remove('tkvApp_Lider');
        
        this.storage.remove('QualUser');
        //this.storage.remove('QualEmail');

        this.storage.remove('QualNome');
        this.storage.remove('QualSobrenome');
        this.storage.remove('QualNivel');
        this.storage.remove('QualplanoSel');
        this.storage.remove('QualPlano');
        this.storage.remove('QualFoto');
        this.storage.remove('QualFone');

        this.storage.remove('EnderecoUserFinal');
        this.storage.remove('NumeroUserFinal');
        this.storage.remove('BairroUserFinal');
        this.storage.remove('ComplementoUserFinal');
        this.storage.remove('CidadeUserFinal');
        this.storage.remove('EstadoUserFinal');
        this.storage.remove('PaisUserFinal');
        this.storage.remove('CepUserFinal');          

        this.storage.remove('ComprasCarrinho');
        this.storage.remove('QualNivelBundle');
        this.storage.remove('QualNivelNome');
        this.storage.remove('QualNivelValor');

        this.navCtrl.setRoot(LoginPage);     

      }   
       
    }); 

  }

  enviaSair(UserVai:string){
    console.log(UserVai);
    var link = 'http://app.progettoapp.com.br/midias-lider/desbloquear_user.php';
    var myData = JSON.stringify({
      uu_e: UserVai, 
      DeviceNovo: 'null',
      Acao: 'Sair'
    });

    this.http.post(link, myData).subscribe(data => {

      //console.log(data['Situacao']);

    });

    let alert = this.alertCtrl.create({
      title: 'Aviso!',
      subTitle: "Você saiu do aplicativo."
    });
    alert.present();  

    this.navCtrl.setRoot(LoginPage);

    setTimeout(() => {
      window.location.reload(); 
    }, 1000);     


  }

  ionViewWillEnter() {
    this.service.getNovidades().subscribe(
      data => {
        this.relnovidades = data.rows;        
        this.storage.get('relNovidades').then((val) => {
          if(val != null ){
            this.numerosNovidades = val.length;
          }else{
            this.storage.set('relNovidades', this.relnovidades)
          }
        });
        this.storage.get('numeroPublicacoes').then((val) => {
          if(val != null){
            this.numerosNovidadesAtual = val;
          }else{
            this.storage.set('numeroPublicacoes', this.relnovidades.length)
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
