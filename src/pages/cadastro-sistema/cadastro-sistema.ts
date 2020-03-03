import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, LoadingController, Loading, App, ModalController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { PlanosPage } from '../planos/planos';
import { PagamentoEntregaPage } from '../pagamento-entrega/pagamento-entrega';
import { HomePage } from '../home/home';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PrivacidadePage } from '../privacidade/privacidade';
import { PlanosAndroidPage } from '../planos-android/planos-android';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-cadastro-sistema',
  templateUrl: 'cadastro-sistema.html',
})
export class CadastroSistemaPage {

  data: any = {};  
  data2: any = {}; 
  data3: any = {};  
  
  isenabled:boolean = true;
  
  loading: Loading;
  BotaoCadastrar : any = 'Cadastrar';

  QualNivel : any = [];
  QualNivelNome : any = [];
  QualNivelValor : any = []; 

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
    private payPal: PayPal, 
    private iab: InAppBrowser,
    public platform: Platform, 
    public formBuilder: FormBuilder
  ){

    this.storage.set('SlideOlhou', 'Sim');

    this.navCtrl = navCtrl;
 
        this.authForm = formBuilder.group({
          NomeUser: ['', 
            Validators.compose([Validators.required, 
            //Validators.pattern('[a-zA-Z]*'),
            Validators.minLength(4),
            Validators.maxLength(255)])
          ],
          SobrenomeUser: ['', 
            Validators.compose([Validators.required, 
            Validators.minLength(4),
            Validators.maxLength(255)])
          ],    
          CpfUser: ['', 
            Validators.compose([Validators.required])
          ],
          DataUser: ['', 
            Validators.compose([Validators.required])
          ],                    
          EmailUser: ['', 
            Validators.compose([Validators.required, 
            Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'),              
            Validators.maxLength(255)])
          ],
          CelularUser: ['', 
            Validators.compose([Validators.required])
          ],
          SenhaUser: ['', 
            Validators.compose([Validators.required, 
            Validators.minLength(4),
            Validators.maxLength(255)])
          ],                                        
          SenhaConfirmar: ['', 
            Validators.compose([Validators.required, 
            Validators.minLength(4),
            Validators.maxLength(255)])
          ],

          aceitotermo: ['false', Validators.compose([Validators.requiredTrue,])]

        });
    
  }
  onSubmit2(value: any): void { 
    if(this.authForm.valid) {
        window.localStorage.setItem('NomeUser', value.NomeUser);
        window.localStorage.setItem('password', value.password);

    }
} 
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  VerPolitica() {      
    //ios
    //this.modalCtrl.create(PrivacidadePage).present();
    this.navCtrl.push(PrivacidadePage);
  }  
  onSubmit(value: any): void { 

    if(this.authForm.valid) {

    this.showLoading();
    this.isenabled=false; 
    this.BotaoCadastrar = "Aguarde, processando...";

    var link = 'http://app.progettoapp.com.br/midias-lider/cadastrar_user.php';
    var myData = JSON.stringify(
      { 
        NomeUser: value.NomeUser, 
        SobrenomeUser: value.SobrenomeUser, 
        CpfUser: value.CpfUser, 
        DataUser: value.DataUser,          
        EmailUser: value.EmailUser, 
        CelularUser: value.CelularUser, 
        SenhaUser: value.SenhaUser, 
        SenhaConfirmar: value.SenhaConfirmar,
        PlanoSelecionado: value.nivel, 
        aceitotermo: value.aceitotermo
      }
    );
    this.http.post(link, myData)
      .subscribe(data => {

        var dadosLogin =  JSON.parse(data["_body"]); 

        if(dadosLogin.rows[0].CadastroSituacao == '1'){

          this.storage.set('QualUser', dadosLogin.rows[0].iduserQualEdita); 
          this.storage.set('QualEmail', value.EmailUser); 
  
          this.storage.set('QualNome', value.NomeUser); 
          this.storage.set('QualSobrenome', value.SobrenomeUser);
          this.storage.set('QualFoto', dadosLogin.rows[0].fotoQualEdita); 
          this.storage.set('tkApp_Lider', dadosLogin.rows[0].token);
          this.storage.set('tkvApp_Lider', dadosLogin.rows[0].token_variado);              

          this.storage.set('QualNivel', dadosLogin.rows[0].nivel);
          this.storage.set('QualplanoSel', dadosLogin.rows[0].planoSelQualEdita);
          this.storage.set('QualPlano', dadosLogin.rows[0].planoQualEdita);
          this.storage.set('QualFone', value.CelularUser);
          
          this.storage.set('AssinarClique', '1');

          this.navCtrl.push(PlanosAndroidPage);

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

          this.isenabled=true; 

        },
        error => {
          this.showError(error);
        }); 

      }
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
