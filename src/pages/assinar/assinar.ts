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
import { CarrinhoPage } from '../carrinho/carrinho';
import { CarregandoPage } from '../carregando/carregando';

@Component({
  selector: 'page-assinar',
  templateUrl: 'assinar.html',
})
export class AssinarPage {

  productId: string;

  id: any = {}; 
  
  data: any = {};  
  data2: any = {}; 
  data3: any = {};  
  
  loading: Loading;

  QualNivel : any = {};
  QualNivelNome : any = {};
  QualNivelValor : any = {};

  QualNivelBundleLeu : any = {};
  Qual_iduser : any = {}; 
  Qual_transactionId : any = {}; 

  AssinarCliqueMsg : any = {}; 
  AssinarCliqueAcao : any = {}; 

  usuario : any;
  acao : any;
  
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

		this.storage.get('AssinarClique').then((val) => {

        this.acao = 'assinar';
        this.AssinarCliqueMsg = 'Entrar no Líder';
        this.AssinarCliqueAcao = '0'; 

    });       

		this.storage.get('QualNivelBundle').then((val) => {
      this.subscribeMembership(val);
    }); 

  }

  // create the subscription
  subscribeMembership( id ) {

    //console.log('passo 0');
  
    // we have to get products before we can buy
    this.iap.getProducts([id]).then((product) => {
      this.iap.subscribe(id).then( (result)=> {
        
          this.storage.set('Qual_transactionId', result.transactionId);
          this.storage.set('Qual_receipt', result.receipt);
          console.log('result in app', result);
          console.log('signature', result.signature);
          console.log('productType', result.productType);

          this.storage.set('Status', 'Logado');
          this.storage.set('SlideOlhou', 'Sim');
          this.storage.set('AssinarClique', '1');
          
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
          
          this.storage.get('QualUser').then((val1) => {
            this.storage.get('Qual_transactionId').then((val2) => {     
              this.storage.get('Qual_receipt').then((val3) => {  

                // cria a parcela no sistema
                var linkPagamento = 'http://app.progettoapp.com.br/midias-lider/applePagarPost.php';
                var myDataPagamento = JSON.stringify(
                  { 
                    acao: this.acao,  
                    uu: val1,  
                    usuario_receipt: val3,                        
                    usuario_transactionId: val2,
                    usuario_situacao: 'Aprovado'
                  }
                );
                this.http.post(linkPagamento, myDataPagamento).subscribe(dataPagamento => {
                  var Pagamento =  JSON.parse(dataPagamento["_body"]);           
                },
                error => {
                  this.showError(error);
                });

              }); 
            }); 
          });                                                                                             

          setTimeout(() => {
            this.navCtrl.setRoot(CarregandoPage);
          }, 500); 
          
          this.restoreMembership(id);

      }).catch( err => {
        
        let alert = this.alertCtrl.create({
          enableBackdropDismiss: false,                  
          title: 'Erro no pagamento!',
          message: 'Tentar novamente ou experimente o aplicativo por 7 dias grátis.',
          buttons: [
            {
              text: this.AssinarCliqueMsg,
              handler: () => {
                
                if(this.AssinarCliqueAcao == '1'){

                  setTimeout(() => {
                    this.navCtrl.setRoot(MinhaConta2Page);
                  }, 500); 

                }else{

                  // cria a parcela no sistema
                  var linkPagamento = 'http://app.progettoapp.com.br/midias-lider/cadastrar_pag.php';
                  var myDataPagamento = JSON.stringify(
                    { 
                      acao: 'assinar', 
                      usuario_id: this.Qual_iduser, 
                      usuario_transactionId: 'Erro - 3',                        
                      usuario_situacao: 'Recusado'
                    }
                  );
                  this.http.post(linkPagamento, myDataPagamento).subscribe(dataPagamento => {
                    var Pagamento =  JSON.parse(dataPagamento["_body"]);           
                  },
                  error => {
                    this.showError(error);
                  });

                    this.storage.set('Qual_transactionId', '');
                    this.storage.set('Status', 'Logado');
                    this.storage.set('SlideOlhou', 'Sim');
                    this.storage.set('AssinarClique', '1');

                    window.location.reload();
                    setTimeout(() => {
                      this.navCtrl.setRoot(CarregandoPage);
                    }, 500); 

                }
        
              }
            },              
            {
              text: 'Tentar novamente',
              handler: () => {

                setTimeout(() => {
                  this.navCtrl.push(AssinarPage);
                }, 500);

              } 
            }
          ]
        })
        alert.present();  
        
      })

    }).catch( err => {
      
      let alert = this.alertCtrl.create({
        enableBackdropDismiss: false,                  
        title: 'Erro no pagamento!',
        message: 'Tentar novamente ou experimente o aplicativo por 7 dias grátis.',
        buttons: [
          {
            text: this.AssinarCliqueMsg,
            handler: () => {
              
              if(this.AssinarCliqueAcao == '1'){

                setTimeout(() => {
                  this.navCtrl.setRoot(MinhaConta2Page);
                }, 500); 

              }else{

                // cria a parcela no sistema
                var linkPagamento = 'http://app.progettoapp.com.br/midias-lider/cadastrar_pag.php';
                var myDataPagamento = JSON.stringify(
                  { 
                    acao: 'assinar', 
                    usuario_id: this.Qual_iduser, 
                    usuario_transactionId: 'Erro - 3',                        
                    usuario_situacao: 'Recusado'
                  }
                );
                this.http.post(linkPagamento, myDataPagamento).subscribe(dataPagamento => {
                  var Pagamento =  JSON.parse(dataPagamento["_body"]);           
                },
                error => {
                  this.showError(error);
                });

                  this.storage.set('Qual_transactionId', '');
                  this.storage.set('Status', 'Logado');
                  this.storage.set('SlideOlhou', 'Sim');
                  this.storage.set('AssinarClique', '1');

                  window.location.reload();
                  setTimeout(() => {
                    this.navCtrl.setRoot(CarregandoPage);
                  }, 500); 

              }
      
            }
          },              
          {
            text: 'Tentar novamente',
            handler: () => {

              setTimeout(() => {
                this.navCtrl.push(AssinarPage);
              }, 500);

            } 
          }
        ]
      })
      alert.present();  
      
    })

  }
  
  // restore in app purchase (required)
  restoreMembership( id ) {

    this.productId = id;

    this.iap.restorePurchases().then( result => {

        // loop through purchases to find the one we are looking for
        for (var i = 0; i < result.length; ++i) {

          // TODO: check result[i].state for cancelled or refunded
          if( result[i].productId == this.productId ) {
            
            console.log( 'Purchase found! Do something...', result )
            return;

          }

        }
 
    })
    .catch( err => {
      console.log(err)
    })

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
