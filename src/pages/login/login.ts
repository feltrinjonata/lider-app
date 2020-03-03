import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, App, MenuController, ToastController, Platform } from 'ionic-angular';
//import { Http, Headers } from '@angular/http';
//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AudioServiceProvider } from './../../providers/audio-service/audio-service';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { Storage } from '@ionic/storage';

import { IAP } from '../../providers/iap/iap';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { HomePage } from '../home/home';
import { AudiosPage } from '../audios/audios';
import { DicionarioPage } from '../dicionario/dicionario';
import { EsqueceuSenhaPage } from '../esqueceu-senha/esqueceu-senha';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { TitulosPage } from '../titulos/titulos';
import { CarregandoPage } from '../carregando/carregando';
import { AssinarPage } from '../assinar/assinar';
import { CadastroSistemaPage } from '../cadastro-sistema/cadastro-sistema';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Injectable()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  model: User;

  data: any = {};  
  loading: Loading;
  dataMinhaListaLivros:any ={};

  isenabled:boolean=true;

  QualEmail : any = {};

  DeviceIDQual : any = {};

  IdUserQual : any = {}; 
  EmailUserQual : any= {};
  NomeUserQual : any = {};
  NivelUserQual : any = {};
  PlanoUserQual : any = {};
  FotoUserQual : any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toast: ToastController,    
    public http: Http,
    public IAP: IAP,
    private iap: InAppPurchase,
    public platform: Platform,    
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    public storage:Storage, 
    public menu: MenuController,
    public audioService: AudioServiceProvider,
    public service: DadosUsuarioProvider,    
    private iab: InAppBrowser,
  ){

    this.storage.set('SlideOlhou', 'Sim');

    //para o player de audio
    this.audioService.audioPlayer.nativeElement.pause();

    this.model = new User();
    this.model.email = '';
    this.model.password = '';

    // --- STORAGE MINHA LISTA E CURTIR/CLASSIFICAR ------------------------------------------ //
    
    // -- LIVRO - PUBLICACAO --- //

    var dataMinhaListaLivros = [{ "idlivro": "0" }];
    this.storage.set("MinhaListaLivros", dataMinhaListaLivros).then( ()=>{} );

    var dataClassficarLivro = [{ "idlivro": "0" }];
    this.storage.set("ClassficarLivro", dataClassficarLivro).then( ()=>{} );
    
    // -- PL - LIDER --- //

    var dataMinhaListaPl= [{ "idpl": "0" }];
    this.storage.set("MinhaListaPl", dataMinhaListaPl).then( ()=>{} );

    var dataClassficarPl = [{ "idpl": "0" }];
    this.storage.set("ClassficarPl", dataClassficarPl).then( ()=>{} );

    // --- VIDEOS - AULAS --- //

    var dataMinhaListaAulas= [{ "idvideo": "0" }];
    this.storage.set("MinhaListaAulas", dataMinhaListaAulas).then( ()=>{} );

    var dataClassficarAulas = [{ "idvideo": "0" }];
    this.storage.set("ClassficarAulas", dataClassficarAulas).then( ()=>{} );    

    // --- MUSICAS - ALBUM --- //

    var dataMinhaListaAlbum = [{ "idalbum": "0" }];
    this.storage.set("MinhaListaAlbum", dataMinhaListaAlbum).then( ()=>{} );

    var dataClassficarAlbum = [{ "idalbum": "0" }];
    this.storage.set("ClassficarAlbum", dataClassficarAlbum).then( ()=>{} );   
    
    // --- MUSICAS - AUDIOS --- //

    var dataMinhaListaAudios = [{ "idaudio": "0" }];
    this.storage.set("MinhaListaAudios", dataMinhaListaAudios).then( ()=>{} );

    var dataClassficarAudios = [{ "idaudio": "0" }];
    this.storage.set("ClassficarAudios", dataClassficarAudios).then( ()=>{} );       

    // --- MUSICAS - CONCERTOS --- //

    var dataMinhaListaConcerto = [{ "idconcerto": "0" }];
    this.storage.set("MinhaListaConcerto", dataMinhaListaConcerto).then( ()=>{} );

    var dataMinhaListaConcerto = [{ "idconcerto": "0" }];
    this.storage.set("ClassificarConcerto", dataMinhaListaConcerto).then( ()=>{} );     
    
    // --- COMPRAS - CARRINHO --- //

    var dataCompras = [{ "idqual": "0" }];
    this.storage.set("ComprasCarrinho", dataCompras).then( ()=>{} );

  }

  ionViewDidEnter() {

    if(this.platform.is('ios')) {

      this.service.getAppleReciboVer().subscribe(
        data => {

          console.log('contador apple', data.rows[0].Contador)
          this.storage.get('AppleContador').then((val) => {

            if( (val != '') && (data.rows[0].Contador == val) ){
              
            }else{
              this.storage.set('AppleContador', data.rows[0].Contador);
              this.IAP.checkStatus();
            }

          });     

        },
        err => console.log(err)  
      );

    }

    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }

  // android e ios agora
  login() {
    this.isenabled=false; 

    this.storage.get('DeviceID').then((val) => {
      this.DeviceIDQual = val;
      //console.log(this.DeviceIDQual);
    })
      
    this.service.login(this.model.email, this.model.password, this.DeviceIDQual).then((result: any) => {
      
      let emailUser = this.model.email;

        //console.log('NumberDevice', result.rows[0].NumberDevice);
        //console.log('DeviceIDQual', this.DeviceIDQual);

        if( (result.rows[0].NumberDevice != this.DeviceIDQual)&&(result.rows[0].NumberDevice != '')&&( (result.rows[0].Logado == '1')||(result.rows[0].Logado == '2') ) ){
          
          let confirm = this.alertCtrl.create({
            title: 'Usuário ativo em outro aparelho!',
            subTitle: "Deseja acessar aqui?",
            buttons: [
              {
                text: 'Sim',
                handler: () => {

                  var link = 'http://app.progettoapp.com.br/midias-lider/desbloquear_user.php';
                  var myData = JSON.stringify({
                    uu_e: emailUser, 
                    DeviceNovo: this.DeviceIDQual,
                    Acao: 'Desbloquear'
                  });
              
                  this.http.post(link, myData).subscribe(data => {});

                  let alert = this.alertCtrl.create({
                    title: 'Aviso!',
                    subTitle: "Usuário liberado para acessar neste aparelho, digite seu e-mail e senha para entrar no aplicativo."
                  });
                  alert.present(); 
                          
                }
              },
              {
                text: 'Não',
                handler: () => {
      
                }
              }
            ]
          });
          confirm.present();

          this.model.email = '';
          this.model.password = '';

        }else if(result.rows[0].Logado == '1'){

          let alert = this.alertCtrl.create({
            title: 'Aguarde!',
            subTitle: "Estamos sincronizando o conteúdo..."
          });
          alert.present(); 

          this.storage.set('Status', 'Logado');
          this.storage.set('SlideOlhou', 'Sim');

          this.storage.set('QualUser', result.rows[0].iduser);
          this.storage.set('QualEmail', result.rows[0].email);

          this.storage.set('QualNome', result.rows[0].nome);
          this.storage.set('QualSobrenome', result.rows[0].sobrenome);
          this.storage.set('QualNivel', result.rows[0].nivel);
          this.storage.set('QualplanoSel', result.rows[0].planoSel);
          this.storage.set('QualNivelNome', result.rows[0].plano);
          this.storage.set('QualPlano', result.rows[0].plano);
          this.storage.set('QualFoto', result.rows[0].foto);
          this.storage.set('QualFone', result.rows[0].fone);
          this.storage.set('QualNivelValor', result.rows[0].planoValor);

          this.storage.set('EnderecoUserFinal', result.rows[0].endereco);
          this.storage.set('NumeroUserFinal', result.rows[0].numero);
          this.storage.set('BairroUserFinal', result.rows[0].bairro);
          this.storage.set('ComplementoUserFinal', result.rows[0].complemento);
          this.storage.set('CidadeUserFinal', result.rows[0].cidade);
          this.storage.set('EstadoUserFinal', result.rows[0].estado);
          this.storage.set('PaisUserFinal', result.rows[0].pais);
          this.storage.set('CepUserFinal', result.rows[0].cep);

          setTimeout(() => {
            this.navCtrl.setRoot(TimelinePage)
          }, 500);
          window.location.reload();
          
        }else if(result.rows[0].Logado == '2'){

          let alert = this.alertCtrl.create({
            title: 'Aviso!',
            subTitle: result.rows[0].nome,
            buttons: ['OK']
          });
          alert.present(); 

          this.storage.set('Status', 'Logado');
          this.storage.set('SlideOlhou', 'Sim');

          this.storage.set('QualUser', result.rows[0].iduser);
          this.storage.set('QualEmail', result.rows[0].email);

          this.storage.set('QualNome', result.rows[0].nome);
          this.storage.set('QualSobrenome', result.rows[0].sobrenome);
          this.storage.set('QualNivel', result.rows[0].nivel);
          this.storage.set('QualplanoSel', result.rows[0].planoSel);
          this.storage.set('QualNivelNome', result.rows[0].plano);
          this.storage.set('QualPlano', result.rows[0].plano);
          this.storage.set('QualFoto', result.rows[0].foto);
          this.storage.set('QualFone', result.rows[0].fone);
          this.storage.set('QualNivelValor', result.rows[0].planoValor);

          this.storage.set('EnderecoUserFinal', result.rows[0].endereco);
          this.storage.set('NumeroUserFinal', result.rows[0].numero);
          this.storage.set('BairroUserFinal', result.rows[0].bairro);
          this.storage.set('ComplementoUserFinal', result.rows[0].complemento);
          this.storage.set('CidadeUserFinal', result.rows[0].cidade);
          this.storage.set('EstadoUserFinal', result.rows[0].estado);
          this.storage.set('PaisUserFinal', result.rows[0].pais);
          this.storage.set('CepUserFinal', result.rows[0].cep);

          window.location.reload();
          setTimeout(() => {
            this.navCtrl.setRoot(TimelinePage)
          }, 500);                 
          
        }else if(result.rows[0].Logado == '3'){

          let alert = this.alertCtrl.create({
            title: 'Erro!',
            subTitle: "Você está com débitos pendentes, favor entrar em contato conosco!",
            buttons: ['OK']
          });
          alert.present();  

        }else if(result.rows[0].Logado == '4'){

          let alert = this.alertCtrl.create({
            title: 'Erro!',
            subTitle: "E-mail digitado é inválido!",
            buttons: ['OK']
          });
          alert.present();    
          
          this.isenabled=true;  

        }else{

          let alert = this.alertCtrl.create({
              title: 'Acesso Negado',
              subTitle: "E-mail ou Senha incorretos.",
              buttons: ['OK']
          });
          alert.present();
          this.isenabled=true;  

        }

    this.isenabled=true; 
      })
      .catch((error: any) => {
        //this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  
  /*
  public login(dados) {
    
    // this.showLoading()

    this.isenabled=false;  

    var link = 'http://app.progettoapp.com.br/midias-lider/login_apps.php';
    var myData = JSON.stringify({
      foto: this.data.foto, nome: this.data.nome, sobrenome: this.data.sobrenome, senha: this.data.senha, email: this.data.email, 
      plano: this.data.plano, nivel: this.data.nivel
    });
    this.http.post(link, myData)
        .subscribe(data => {
          
           var dadosLogin =  JSON.parse(data["_body"]); 
           
           //console.log(dadosLogin)  
                                    
              if(dadosLogin.rows[0].Logado == '1'){

                this.storage.set('Status', 'Logado');
                this.storage.set('SlideOlhou', 'Sim');

                this.storage.set('QualUser', dadosLogin.rows[0].iduser);
                this.storage.set('QualEmail', this.data.email);

                this.storage.set('QualNome', dadosLogin.rows[0].nome);
                this.storage.set('QualSobrenome', dadosLogin.rows[0].sobrenome);
                this.storage.set('QualNivel', dadosLogin.rows[0].nivel);
                this.storage.set('QualplanoSel', dadosLogin.rows[0].planoSel);
                this.storage.set('QualPlano', dadosLogin.rows[0].plano);
                this.storage.set('QualFoto', dadosLogin.rows[0].foto);
                this.storage.set('QualFone', dadosLogin.rows[0].fone);

                this.storage.set('EnderecoUserFinal', dadosLogin.rows[0].endereco);
                this.storage.set('NumeroUserFinal', dadosLogin.rows[0].numero);
                this.storage.set('BairroUserFinal', dadosLogin.rows[0].bairro);
                this.storage.set('ComplementoUserFinal', dadosLogin.rows[0].complemento);
                this.storage.set('CidadeUserFinal', dadosLogin.rows[0].cidade);
                this.storage.set('EstadoUserFinal', dadosLogin.rows[0].estado);
                this.storage.set('PaisUserFinal', dadosLogin.rows[0].pais);
                this.storage.set('CepUserFinal', dadosLogin.rows[0].cep);

                window.location.reload();
                setTimeout(() => {
                  this.navCtrl.setRoot(CarregandoPage)
                }, 500);   

              }else if(dadosLogin.rows[0].Logado == '2'){

                //mensagem dias
                if(dadosLogin.rows[0].MensagemUser != ''){
                  let alert = this.alertCtrl.create({
                    enableBackdropDismiss: false,                    
                    title: 'Erro!',
                    subTitle: dadosLogin.rows[0].MensagemUser,
                    buttons: ['OK']
                  });
                  alert.present(); 
                   
                }

                this.storage.set('Status', 'Logado');
                this.storage.set('SlideOlhou', 'Sim');

                this.storage.set('QualUser', dadosLogin.rows[0].iduser);
                this.storage.set('QualEmail', this.data.email);

                this.storage.set('QualNome', dadosLogin.rows[0].nome);
                this.storage.set('QualSobrenome', dadosLogin.rows[0].sobrenome);
                this.storage.set('QualNivel', dadosLogin.rows[0].nivel);
                this.storage.set('QualplanoSel', dadosLogin.rows[0].planoSel);
                this.storage.set('QualPlano', dadosLogin.rows[0].plano);
                this.storage.set('QualFoto', dadosLogin.rows[0].foto);
                this.storage.set('QualFone', dadosLogin.rows[0].fone);

                this.storage.set('EnderecoUserFinal', dadosLogin.rows[0].endereco);
                this.storage.set('NumeroUserFinal', dadosLogin.rows[0].numero);
                this.storage.set('BairroUserFinal', dadosLogin.rows[0].bairro);
                this.storage.set('ComplementoUserFinal', dadosLogin.rows[0].complemento);
                this.storage.set('CidadeUserFinal', dadosLogin.rows[0].cidade);
                this.storage.set('EstadoUserFinal', dadosLogin.rows[0].estado);
                this.storage.set('PaisUserFinal', dadosLogin.rows[0].pais);
                this.storage.set('CepUserFinal', dadosLogin.rows[0].cep);

                window.location.reload();
                setTimeout(() => {
                  this.navCtrl.setRoot(CarregandoPage)
                }, 1000);                       
                
              }else if(dadosLogin.rows[0].Logado == '3'){

                //debitos pendentes
                if(dadosLogin.rows[0].MensagemUser != ''){

                  let alert = this.alertCtrl.create({
                    enableBackdropDismiss: false,                    
                    title: 'Erro!',
                    subTitle: dadosLogin.rows[0].MensagemUser,
                    buttons: ['OK']
                  });
                  alert.present(); 
                   
                }

              }else if(dadosLogin.rows[0].Logado == '4'){

                let alert = this.alertCtrl.create({
                  enableBackdropDismiss: false,                  
                  title: 'Erro!',
                  subTitle: "E-mail digitado é inválido!",
                  buttons: ['OK']
                });
                alert.present();    
                
                this.isenabled=true;  

              }else{
                let alert = this.alertCtrl.create({
                  enableBackdropDismiss: false,                  
                  title: 'Acesso Negado',
                  subTitle: "E-mail ou Senha incorretos.",
                  buttons: ['OK']
              });
              alert.present();
               this.isenabled=true;  
              }

          this.isenabled=true; 

        },
        error => {
          this.showError(error);
        }); 
  }  
  */
/*
  public openBrowser(){

    let url = 'http://app.progettoapp.com.br/novo-cadastro';
    const browser = this.iab.create(url, '_blank', this.options);    
    browser.show(); 

    this.browserTab.isAvailable()
    .then((isAvailable: boolean) => {

    if(isAvailable) {

        this.browserTab.openUrl('http://app.progettoapp.com.br/novo-cadastro');

    } else {

        // if custom tabs are not available you may  use InAppBrowser

    }

    }); 

  }*/

  esqueceuSenha(){
    this.navCtrl.push(EsqueceuSenhaPage);
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

  // android
    /* 
  cadastroUser(item: string) {   
    this.navCtrl.push(CadastroSistemaPage,{ item });
  } 
  */
  // ios 

  cadastroUser(item: string) {   
    this.navCtrl.push(CadastroUsuarioPage,{ item });
  } 

}

export class User {
  email: string;
  password: string; 
}