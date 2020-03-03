import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, LoadingController, Loading, App, ModalController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DomSanitizer } from '@angular/platform-browser';

import { PlanosPage } from '../planos/planos';
import { PagamentoEntregaPage } from '../pagamento-entrega/pagamento-entrega';
import { HomePage } from '../home/home';
import { MinhaConta2Page } from './../minha-conta2/minha-conta2';

@Component({
  selector: 'page-assinar-android',
  templateUrl: 'assinar-android.html', 
})
export class AssinarAndroidPageModule {

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

  abrir : any;
  User_tkApp_Lider : any;
  IdUserQual : any;

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
    private sanitizer: DomSanitizer,    
  ){
    
		this.storage.get('AssinarClique').then((val) => {

      if(val == '1'){
        this.AssinarCliqueMsg = 'Voltar para Líder';
        this.AssinarCliqueAcao = '1'; 
      }else{
        this.AssinarCliqueMsg = 'Entrar no Líder';
        this.AssinarCliqueAcao = '0'; 
      }

    });       

    this.storage.get('QualUser').then((value) => {
      this.storage.get('tkApp_Lider').then((val) => {
        this.storage.get('MudarPlanoId').then((valPlano) => {

        this.User_tkApp_Lider = val;

        this.abrir = this.sanitizer.bypassSecurityTrustResourceUrl('http://app.progettoapp.com.br/midias-lider/api/rest/index.php?plano=' + valPlano + '&c_u=' + value + '&c_t=' + this.User_tkApp_Lider);
        this.IdUserQual = value;

        // cria a parcela no sistema
        /*
        var linkPagamento = 'http://app.progettoapp.com.br/midias-lider/cadastrar_pag.php';
        var myDataPagamento = JSON.stringify(
          { 
            acao: 'android', 
            usuario_id: this.IdUserQual
          }
        );
        this.http.post(linkPagamento, myDataPagamento).subscribe(dataPagamento => {
          var Pagamento =  JSON.parse(dataPagamento["_body"]);           
        },
        error => {
          this.showError(error);
        }); */

        });
      });       
    });  
  
  }

  ionViewDidLoad() {

  }  

  entrar(){

    this.storage.set('Status', 'Logado');
    this.storage.set('AssinarClique', '1');
        
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

    window.location.reload();
    setTimeout(() => {
      this.navCtrl.setRoot(HomePage)
    }, 500);  

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
