import { Component, Testability } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, ToastController, ViewController, ModalController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-pagamento-entrega',
  templateUrl: 'pagamento-entrega.html',
})
export class PagamentoEntregaPage {

  data2: any = {};  

  IdUserQual : any = {}; 

  EnderecoUserQual : any = {};  
  NumeroUserQual : any = {};
  BairroUserQual : any = {};
  ComplementoUserQual : any = {};
  CidadeUserQual : any = {};  
  EstadoUserQual : any = {};
  PaisUserQual : any = {};
  CepUserQual : any = {};
  
  model: Teste;

  constructor(
    public modalCtrl : ModalController, public viewCtrl : ViewController, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, 
    public storage: Storage, public alertCtrl: AlertController, private toastCtrl: ToastController,
    public menu: MenuController    
  ){
    

    this.userDadosGuardados();
    this.model = new Teste();

  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  enviarEndereco(){
    
		this.storage.set("EnderecoUserFinal", this.data2.endereco).then( ()=>{} );    
		this.storage.set("NumeroUserFinal", this.data2.numero).then( ()=>{} );  
		this.storage.set("BairroUserFinal", this.data2.bairro).then( ()=>{} );  
		this.storage.set("ComplementoUserFinal", this.data2.complemento).then( ()=>{} );  
		this.storage.set("CidadeUserFinal", this.data2.cidade).then( ()=>{} ); 
		this.storage.set("EstadoUserFinal", this.data2.estado).then( ()=>{} ); 
		this.storage.set("PaisUserFinal", this.data2.pais).then( ()=>{} );  
		this.storage.set("CepUserFinal", this.data2.cep).then( ()=>{} );  
    
    this.viewCtrl.dismiss(this.data2);
    
    this.toastCtrl.create({
      message: "Endereço atualizado com sucesso!",
      duration: 3000,
      position: 'middle',
    }).present();

  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  userDadosGuardados(){
    //this.storage.get('QualUser').then((val) => {
      this.IdUserQual = '';
   // })
    //this.storage.get('EnderecoUserFinal').then((val) => {
      this.EnderecoUserQual = '';
    //})
    //this.storage.get('NumeroUserFinal').then((val) => {
      this.NumeroUserQual = '';
    //})
   // this.storage.get('BairroUserFinal').then((val) => {
      this.BairroUserQual = '';
   // })
    //this.storage.get('ComplementoUserFinal').then((val) => {
      this.ComplementoUserQual = '';
   // })    
   // this.storage.get('CidadeUserFinal').then((val) => {
      this.CidadeUserQual = '';
   // })
   // this.storage.get('EstadoUserFinal').then((val) => {
      this.EstadoUserQual = '';
   // })                
   // this.storage.get('PaisUserFinal').then((val) => {
      this.PaisUserQual = '';
   // })   
   // this.storage.get('CepUserFinal').then((val) => {
      this.CepUserQual = '';
   // })   

  } 

  ionViewDidLoad() {

  }

}


export class Teste {
  cep: string;
}
