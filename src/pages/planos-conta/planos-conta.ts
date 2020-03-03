import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ViewController, ToastController, Loading, MenuController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { PrivacidadePage } from '../privacidade/privacidade';
import { PlanosCobrancaPage } from '../planos-cobranca/planos-cobranca';
import { HomePage } from '../home/home';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-planos-conta',
  templateUrl: 'planos-conta.html',
})
export class PlanosContaPage {

  IdUserQual : any = {}; 
  PlanoUserQual : any = {};
  data: any = {};  
  data2: any = {}; 
  data3: any = {};  
  
  plano: any = {};  
  relPlanos : any;  
  
  loading: Loading;

  QualNivel : any = [];
  QualNivelNome : any = [];
  QualNivelValor : any = []; 
  BotaoCadastrar : any = 'Cadastrar';

  EnderecoUserQual : any = [];  
  NumeroUserQual : any = [];
  BairroUserQual : any = [];
  ComplementoUserQual : any = [];
  CidadeUserQual : any = []; 
  EstadoUserQual : any = [];
  PaisUserQual : any = [];
  CepUserQual : any = [];

  aceitotermo : any = [];

  usuario : any;
  authForm: FormGroup;

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
    
    this.getPlanos2();
    this.userDadosGuardados();

  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  userDadosGuardados(){
    this.storage.get('QualUser').then((val) => {
      this.IdUserQual = val;
    })
  } 

  VerPolitica() {      
    //this.navCtrl.push(PrivacidadePage);
    this.modalCtrl.create(PrivacidadePage).present();
  } 
  VerCobranca() {      
    this.modalCtrl.create(PlanosCobrancaPage).present();
  } 

  getPlanos2() {
    this.service.getPlanos()
    .subscribe(
        data=> this.relPlanos = data.rows,
        err=> console.log(err)        
    );
  }

  selecionarPlano(plano){
    
    this.showLoading();

    this.iap
    .getProducts([plano.bundle_id])
    .then((productData) => {
 
      this.iap
      .subscribe(productData[0].productId)
      .then((data)=> {
                  
                  // cria a parcela no sistema
                  var link = 'http://app.progettoapp.com.br/midias-lider/cadastrar_pag.php';
                  var myData = JSON.stringify(
                    { 
                      usuario_id: this.IdUserQual, 
                      usuario_nivel: this.QualNivel, 
                      usuario_plano: plano.idplano, 
                      usuario_transactionId: data.transactionId, 
                      usuario_situacao: 'Aprovado'
                    }
                  );
                  this.http.post(link, myData).subscribe(data => {
                    var dadosLogin =  JSON.parse(data["_body"]); 
                  },
                  error => {
                    this.showError(error);
                  }); 

                  setTimeout(() => {
                    this.navCtrl.setRoot(TimelinePage);
                  }, 500);
                  this.loading.dismiss();

      }).catch((err)=> {
        this.showError(err);
      });

    })
    .catch((err) => {
      this.showError(err);
    }); 
    
    this.viewCtrl.dismiss(plano);

  }

  fecharModal(){
    this.viewCtrl.dismiss();
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
