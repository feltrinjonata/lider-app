import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, LoadingController, Loading, App, ModalController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { PlanosPage } from '../planos/planos';
import { PagamentoEntregaPage } from '../pagamento-entrega/pagamento-entrega';
import { HomePage } from '../home/home';
import { MinhaConta2Page } from './../minha-conta2/minha-conta2';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-assinar-degustacao',
  templateUrl: 'assinar-degustacao.html',
})
export class AssinarDegustacaoPage {

  data: any = {};  
  data2: any = {}; 
  data3: any = {};  
  
  loading: Loading;

  QualNivel : any = {};
  QualNivelNome : any = {};
  QualNivelValor : any = {};

  QualNivelBundleLeu : any = {};
  Qual_iduser : any = {}; 

  AssinarCliqueMsg : any = {}; 
  AssinarCliqueAcao : any = {}; 

  usuario : any;

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
    private iap: InAppPurchase,
    public service: DadosUsuarioProvider,    
  ){

		this.storage.get('QualUser').then((val) => {
      this.Qual_iduser = val;
    });     

    this.service.getQualPlanoBundle().subscribe(
      data => {
        
        //if(data.rows[0].Verificador == '0'){
        //console.log('gremiooo', data.rows[0].bundle_id);

        this.iap
        .getProducts([data.rows[0].bundle_id])
        .then((productData) => {

          //console.log('productData', productData);

          this.iap
          .subscribe(productData[0].productId)
          .then((data)=> {

            //console.log('this.Qual_iduser', this.Qual_iduser);
            //console.log('data.receipt', data.receipt);
            //console.log('data.transactionId', data.transactionId);
            
            //pega o retorno da apple d mostra a mensagem
            if(data.receipt != ''){
              
              // cria a parcela no sistema
              var linkPagamento = 'http://app.progettoapp.com.br/midias-lider/cadastrar_pag.php';
              var myDataPagamento = JSON.stringify(
                { 
                  acao: 'assinar', 
                  usuario_id: this.Qual_iduser, 
                  usuario_transactionId: data.transactionId, 
                  usuario_situacao: 'Aprovado'
                }
              );
              this.http.post(linkPagamento, myDataPagamento).subscribe(dataPagamento => {
                var Pagamento =  JSON.parse(dataPagamento["_body"]);           
              },
              error => {
                this.showError(error);
              }); 
                                                                                              
              window.location.reload();
              setTimeout(() => {
                this.navCtrl.setRoot(TimelinePage);
              }, 500); 

            }else{

              window.location.reload();
              setTimeout(() => {
                this.navCtrl.setRoot(TimelinePage);
              }, 500); 

            }

          }).catch((err)=> {

            let alert = this.alertCtrl.create({
              enableBackdropDismiss: false,                    
              title: 'Erro no pagamento!',
              message: 'Tentar novamente?',
              buttons: [             
                {
                  text: 'Tentar novamente',
                  handler: () => {

                    setTimeout(() => {
                      this.navCtrl.push(AssinarDegustacaoPage);
                    }, 500);
                    
                  }
                }
              ]
            })
            alert.present(); 

          });
            
        })
        .catch((err) => {

          let alert = this.alertCtrl.create({
            enableBackdropDismiss: false,                    
            title: 'Erro no pagamento!',
            message: 'Tentar novamente?',
            buttons: [              
              {
                text: 'Tentar novamente',
                handler: () => {

                  setTimeout(() => {
                    this.navCtrl.push(AssinarDegustacaoPage);
                  }, 500);
                  
                }
              }
            ]
          })
          alert.present(); 

        });    
 
    },
    err => console.log(err)  
  );    
  
  }

  ionViewDidLoad() {

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
