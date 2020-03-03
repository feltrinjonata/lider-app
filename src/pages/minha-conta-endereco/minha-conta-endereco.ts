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
  selector: 'page-minha-conta-endereco',
  templateUrl: 'minha-conta-endereco.html',
})
export class MinhaContaEnderecoPage {

  data: any = {};  

  IdUserQual : any = {}; 

  EnderecoUserQual : any = {};  
  NumeroUserQual : any = {};
  BairroUserQual : any = {};
  ComplementoUserQual : any = {};
  CidadeUserQual : any = {};  
  EstadoUserQual : any = {};
  PaisUserQual : any = {};
  CepUserQual : any = {};

	constructor(
		public modalCtrl : ModalController, public viewCtrl : ViewController, public formBuilder: FormBuilder,
		public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, 
    public storage: Storage, public alertCtrl: AlertController, private toastCtrl: ToastController,
    public http: Http
	){

    this.userDadosGuardados();
		
	}

	enviarEndereco(){

		this.storage.set("EnderecoUserFinal", this.data.endereco).then( ()=>{} );    
		this.storage.set("NumeroUserFinal", this.data.numero).then( ()=>{} );  
		this.storage.set("BairroUserFinal", this.data.bairro).then( ()=>{} );  
		this.storage.set("ComplementoUserFinal", this.data.complemento).then( ()=>{} );  
		this.storage.set("CidadeUserFinal", this.data.cidade).then( ()=>{} ); 
		this.storage.set("EstadoUserFinal", this.data.estado).then( ()=>{} ); 
		this.storage.set("PaisUserFinal", this.data.pais).then( ()=>{} );  
		this.storage.set("CepUserFinal", this.data.cep).then( ()=>{} );  

    var link = 'http://app.progettoapp.com.br/midias-lider/usuario_endereco.php';
    var myData = JSON.stringify({
      IdUser: this.data.Id_UserQual, 
      EnderecoUser: this.data.endereco,
      NumeroUser: this.data.numero, 
      BairroUser: this.data.bairro,
      ComplementoUser: this.data.complemento,
      CidadeUser: this.data.cidade, 
      EstadoUser: this.data.estado, 
      PaisUser: this.data.numero, 
      CepUser: this.data.cep           
    });
  
    this.http.post(link, myData)
    .subscribe(data => {
  
      var dadosLogin =  JSON.parse(data["_body"]); 

      if(dadosLogin.rows[0].DeuCerto == '1'){
  
        this.toastCtrl.create({
          message: "Endereço atualizado com sucesso!",
          duration: 3000,
          position: 'middle',
        }).present();

        //window.location.reload();
        setTimeout(() => {
          this.navCtrl.setRoot(MinhaContaPage)
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
