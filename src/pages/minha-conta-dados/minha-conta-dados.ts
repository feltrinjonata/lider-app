import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, ToastController, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';

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
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { MinhaContaPage } from '../minha-conta/minha-conta';
import { MinhaConta2Page } from '../minha-conta2/minha-conta2';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-minha-conta-dados',
  templateUrl: 'minha-conta-dados.html',
})
export class MinhaContaDadosPage {

  data: any = {};  

  IdUserQual : any = {}; 
  NomeUserQual : any = {}; 
  SobrenomeUserQual : any = {}; 

	constructor(
    public modalCtrl : ModalController, 
    public viewCtrl : ViewController, 
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    public http: Http
	){

    this.userDadosGuardados();
		
	}

	enviarEndereco(){

		this.storage.set("QualNome", this.data.nome).then( ()=>{} );    
		this.storage.set("QualSobrenome", this.data.sobrenome).then( ()=>{} );  

    var link = 'http://app.progettoapp.com.br/midias-lider/usuario_dados.php';
    var myData = JSON.stringify({
      IdUser: this.data.Id_UserQual, 
      NomeUser: this.data.nome,
      SobrenomeUser: this.data.sobrenome        
    });
  
    this.http.post(link, myData)
    .subscribe(data => {
  
      var dadosLogin =  JSON.parse(data["_body"]); 

      if(dadosLogin.rows[0].DeuCerto == '1'){ 
  
        this.toastCtrl.create({
          message: "Dados atualizados com sucesso!",
          duration: 3000,
          position: 'middle',
        }).present();

        //window.location.reload();
        setTimeout(() => {
          this.navCtrl.setRoot(MinhaConta2Page)
        }, 100);

      }else{
  
        this.toastCtrl.create({
          message: "Erro! Todos os campos devem estar preenchidos.",
          duration: 3000,
          position: 'middle',
        }).present();  
  
      }
                                    
    },
    error => {
      //this.showError(error);
    }); 

	}

  userDadosGuardados(){

    this.storage.get('QualUser').then((val) => {
      this.IdUserQual = val;
    })
    this.storage.get('QualNome').then((val) => {
      this.NomeUserQual = val;
    })
    this.storage.get('QualSobrenome').then((val) => {
      this.SobrenomeUserQual = val;
    })

  } 
  
	ionViewDidLoad(){
    this.userDadosGuardados();
	}

	abrirPaginaHome() {
		this.navCtrl.setRoot(TimelinePage);
	}
	abrirPaginaTitulos() {
		this.navCtrl.setRoot(TitulosPage);
	}
	abrirPaginaPublicacoes() {
		this.navCtrl.setRoot(TitulosLivrosPage);
	}
	abrirPaginaPl() {
		this.navCtrl.setRoot(RevistaPlPage);
	}
	abrirPaginaOntoarte() {
		this.navCtrl.setRoot(OntoartePage);
	}
	abrirPaginaAovivo() {
		this.navCtrl.setRoot(AovivoVideosPage);
	}
	abrirPaginaAreaUsuarioRestrita() {
		this.navCtrl.setRoot(AreaUsuarioRestritaPage);
	}
	abrirPaginaEventos() {
		this.navCtrl.setRoot(EventosPage);
	}
	abrirPaginaBusca() {
		this.navCtrl.setRoot(BuscaPage);
	}
}
