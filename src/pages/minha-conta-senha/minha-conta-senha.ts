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
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-minha-conta-senha',
  templateUrl: 'minha-conta-senha.html',
})
export class MinhaContaSenhaPage {

  data : any = {};  

	isenabled : boolean = true;

  IdUserQual : any = {}; 

	constructor(
		public modalCtrl : ModalController, public viewCtrl : ViewController, public formBuilder: FormBuilder,
		public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, 
    public storage: Storage, public alertCtrl: AlertController, private toastCtrl: ToastController,
    public http: Http
	){

		this.userDadosGuardados();

  }

	MudarSenha(){
		
		this.isenabled = false;
		
		var link = 'http://app.progettoapp.com.br/midias-lider/mudar_senha.php';
    var myData = JSON.stringify({
      IdUserQual: this.data.Id_UserQual, 
      SenhaUser: this.data.SenhaUser,
      SenhaConfirmar: this.data.SenhaConfirmar        
    });
  
    this.http.post(link, myData).subscribe(data => {
  
      var dadosLogin =  JSON.parse(data["_body"]); 
      console.log(dadosLogin.rows[0].QualSituacao);
      if(dadosLogin.rows[0].QualSituacao == '2'){ 
  
        this.toastCtrl.create({
          message: "Senha alterada com sucesso!",
          duration: 3000,
          position: 'middle',
        }).present();

        //window.location.reload();
        setTimeout(() => {
          this.navCtrl.setRoot(MinhaContaSenhaPage)
        }, 100);

      }else if(dadosLogin.rows[0].QualSituacao == '1'){ 
  
        this.toastCtrl.create({
          message: "As senha não são iguais, favor digitar novamente!",
          duration: 3000,
          position: 'middle',
        }).present();

        //window.location.reload();
        setTimeout(() => {
          this.navCtrl.setRoot(MinhaContaSenhaPage)
        }, 100);

      }else{
  
        this.toastCtrl.create({
          message: "Erro! Todos os campos devem estar preenchidos.",
          duration: 3000,
          position: 'middle',
        }).present();  
  
      }
			
			this.isenabled = true;

    },
    error => {
      //this.showError(error);
    }); 

	}

  ionViewDidLoad() {

  }

  userDadosGuardados(){
    this.storage.get('QualUser').then((val) => {
      this.IdUserQual = val;
		})
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
