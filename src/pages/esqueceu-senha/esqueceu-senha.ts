import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-esqueceu-senha',
  templateUrl: 'esqueceu-senha.html',
})
export class EsqueceuSenhaPage {

  data: any = {};  
  loading: Loading;

  isenabled:boolean = true;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private http: Http,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, 
    public storage:Storage, public menu: MenuController
  ){

  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  public solicitar(dados) {

    // this.showLoading()

    this.isenabled = false; 

    var link = 'http://app.progettoapp.com.br/midias-lider/esqueci_senha.php';
    var myData = JSON.stringify(
      {
        email: this.data.email, emailConfirma: this.data.emailConfirma
      }
    );
    this.http.post(link, myData)
        .subscribe(data => {

           var dadosLogin =  JSON.parse(data["_body"]); 
           //console.log(dadosLogin)  
                                    
               if(dadosLogin.rows[0].DeuCertoEsqueceuSenha == '1'){

                let alert = this.alertCtrl.create({
                  title: 'Sucesso!',
                  subTitle: "Foi enviado um e-mail com sua nova senha.",
                  buttons: ['OK']
                });
                alert.present();
                
              }else if(dadosLogin.rows[0].DeuCertoEsqueceuSenha == '2'){
 
                  let alert = this.alertCtrl.create({
                    title: 'Erro!',
                    subTitle: "E-mail não são iguais!",
                    buttons: ['OK']
                  });
                  alert.present();

                }else if(dadosLogin.rows[0].DeuCertoEsqueceuSenha == '4'){

                  let alert = this.alertCtrl.create({
                    title: 'Erro!',
                    subTitle: "E-mail digitado é inválido!",
                    buttons: ['OK']
                  });
                  alert.present();                  

              }else{
                
                let alert = this.alertCtrl.create({
                  title: 'Erro!',
                  subTitle: "E-mail inválido.",
                  buttons: ['OK']
                });
                alert.present();

              }

          this.isenabled = true;   
          
        },
        error => {
          this.showError(error);
        }); 
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
