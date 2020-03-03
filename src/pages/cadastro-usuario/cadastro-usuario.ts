import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, LoadingController, Loading, App, ModalController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PlanosPage } from '../planos/planos';
import { PagamentoEntregaPage } from '../pagamento-entrega/pagamento-entrega';
import { HomePage } from '../home/home';
import { AssinarPage } from '../assinar/assinar';
import { PrivacidadePage } from '../privacidade/privacidade';
import { PlanosCobrancaPage } from '../planos-cobranca/planos-cobranca';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

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
    public navParams: NavParams, 
    public modalCtrl : ModalController, 
    public loadingCtrl: LoadingController, 
    public storage:Storage, 
    public menu: MenuController,
    private http: Http, 
    private alertCtrl: AlertController, 
    private iab: InAppBrowser,
    public platform: Platform, 
    public formBuilder: FormBuilder,
    private iap: InAppPurchase
  ){

    this.storage.set('AssinarClique', '0');
    this.storage.set('SlideOlhou', 'Sim');
    
    this.navCtrl = navCtrl;
 
    this.authForm = formBuilder.group({

      NomeUser: ['', 
        Validators.compose([Validators.required, 
        //Validators.pattern('[a-zA-Z]*'),
        Validators.minLength(3),
        Validators.maxLength(255)])
      ],
      SobrenomeUser: ['', 
        Validators.compose([Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(255)])
      ],    

      EmailUser: ['', 
        Validators.compose([Validators.required, 
        Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'),              
        Validators.maxLength(255)])
      ],

      SenhaUser: ['', 
        Validators.compose([Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(25)])
      ],                                        
      SenhaConfirmar: ['', 
        Validators.compose([Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(25)])
      ]

    });
    
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  onSubmit(value: any): void { 

    this.BotaoCadastrar = "Aguarde, processando...";

    if(this.authForm.valid){

      this.showLoading();

      var link = 'http://app.progettoapp.com.br/midias-lider/cadastrar_user_apple.php';
      var myData = JSON.stringify(
      { 
        NomeUser: value.NomeUser, 
        SobrenomeUser: value.SobrenomeUser, 
        EmailUser: value.EmailUser, 
        SenhaUser: value.SenhaUser, 
        SenhaConfirmar: value.SenhaConfirmar
      }
    );
    this.http.post(link, myData).subscribe(data => {

        var dadosLogin =  JSON.parse(data["_body"]); 
          
        //console.log(dadosLogin.rows[0].CadastroSituacao);
          
          // deu certo vai pra home
          if(dadosLogin.rows[0].CadastroSituacao == '1'){

            this.storage.set('QualUser', dadosLogin.rows[0].iduserQualEdita); 
            this.storage.set('QualEmail', value.EmailUser); 

            this.storage.set('QualNome', value.NomeUser); 
            this.storage.set('QualSobrenome', value.SobrenomeUser);
            this.storage.set('QualFoto', dadosLogin.rows[0].fotoQualEdita); 
            this.storage.set('tkApp_Lider', dadosLogin.rows[0].token);
            this.storage.set('tkvApp_Lider', dadosLogin.rows[0].token_variado);

            //redireciona para proxmia page
            //this.navCtrl.push(PlanosCobrancaPage);
            this.navCtrl.push(PlanosPage);
          
          }else if(dadosLogin.rows[0].CadastroSituacao == '2'){
              
            this.showError("Senha não conferem, favor digitar novamente.");
            this.BotaoCadastrar = "Cadastrar";

          }else if(dadosLogin.rows[0].CadastroSituacao == '3'){
              
            this.showError("Dados de entrega não preenchidos, favor digitar os mesmos.");
            this.BotaoCadastrar = "Cadastrar";
              
          }else if(dadosLogin.rows[0].CadastroSituacao == '4'){
        
            this.showError("Digite um e-mail válido.");
            this.BotaoCadastrar = "Cadastrar";                    

          }else if(dadosLogin.rows[0].CadastroSituacao == '5'){
         
            this.showError("Todos os campos com * devem ser preenchidos!");
            this.BotaoCadastrar = "Cadastrar";       

          }else if(dadosLogin.rows[0].CadastroSituacao == '6'){
             
            this.showError("Você deve ler nossos termos e aceitar a opção em nosso formulário!");
            this.BotaoCadastrar = "Cadastrar";  

          }else{
                           
            this.showError("E-mail inválido ou já cadastrado.");
            this.BotaoCadastrar = "Cadastrar";

          }

          //this.isenabled=true; 

        },
        error => {
          this.showError(error);
          this.BotaoCadastrar = "Cadastrar";  
        }); 

      }else{

        this.showError("Todos os campos com * devem ser preenchidos!");
        this.BotaoCadastrar = "Cadastrar";  

      }

      this.BotaoCadastrar = "Cadastrar";  
  }  
      
  showLoading(){

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
