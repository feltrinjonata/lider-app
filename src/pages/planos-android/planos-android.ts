import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, Loading, ToastController, ModalController, ViewController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-planos-android',
  templateUrl: 'planos-android.html',
})
export class PlanosAndroidPage {
  
  loading: Loading;

  plano: any = {};  
  relPlanos : any;  
  Qual_iduser : any = {}; 
  AssinarCliqueAcao : any = {};
  PlanoSelecionado : any = {};
  
  constructor(
    public loadingCtrl: LoadingController, 
    private http:Http, 
    public modalCtrl : ModalController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public viewCtrl : ViewController,
    public alertCtrl: AlertController, 
    public service : DadosUsuarioProvider, 
    private toastCtrl: ToastController,
    public menu: MenuController
  ){
    
    this.getPlanos2();

    this.storage.get('QualUser').then((val) => {
      this.Qual_iduser = val;
    }); 

		this.storage.get('QualplanoSel').then((val) => {
      this.PlanoSelecionado = val; 
    });
  }
  
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  getPlanos2() {
    //retorno de Dados
    this.service.getPlanos()
    .subscribe(
        data=> this.relPlanos = data.rows,
        err=> console.log(err)        
    );
  }

  selecionarPlano(plano){

    this.storage.set("QualNivel", plano.idplano).then( ()=>{} ); 
    this.storage.set("QualplanoSel", plano.idplano).then( ()=>{} ); 
    this.storage.set("QualNivelNome", plano.Titulo).then( ()=>{} ); 
    this.storage.set("QualNivelValor", plano.Valor).then( ()=>{} ); 
    this.storage.set("QualNivelBundle", plano.bundle_id).then( ()=>{} );       

    var link = 'http://app.progettoapp.com.br/midias-lider/cadastrar_pag.php';
    var myData = JSON.stringify(
      { 
        acao: 'android-planos', 
        usuario_id: this.Qual_iduser,
        usuario_nivel: '1', 
        usuario_plano: plano.idplano,  
      }
    );
    this.http.post(link, myData).subscribe(data => {
      var dadosLogin =  JSON.parse(data["_body"]);           
    },
    error => {
      this.showError(error);
    }); 

    this.navCtrl.push(AssinarAndroidPageModule);

  }

  ionViewDidLoad() {

  }

  showLoading() {

    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      dismissOnPageChange: true
    });
    this.loading.present();

  }

  showError(text) {

    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,      
      title: 'Aviso',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();

  }  

}