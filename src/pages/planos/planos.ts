import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, Loading, App, ToastController, ModalController, ViewController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { PrivacidadePage } from '../privacidade/privacidade';
import { PlanosCobrancaPage } from '../planos-cobranca/planos-cobranca';
import { PlanosContaPage } from '../planos-conta/planos-conta';
import { MinhaContaPrivacidadePage } from '../minha-conta-privacidade/minha-conta-privacidade';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-planos',
  templateUrl: 'planos.html',
})
export class PlanosPage {

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

    /*let confirm = this.alertCtrl.create({
      title: 'Teste nosso aplicativo por 7 dias gratuitos!',
      subTitle: "Selecione um dos planos e entre para a Experiência Líder",
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    confirm.present();*/

    this.storage.get('QualUser').then((val) => {
      this.Qual_iduser = val;
    }); 

		this.storage.get('AssinarClique').then((val) => {
      this.AssinarCliqueAcao = val; 
    });

		this.storage.get('QualplanoSel').then((val) => {
      this.PlanoSelecionado = val; 
    });

    this.getPlanos2();

  }
  
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
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

    this.storage.set("QualNivel", plano.idplano).then( ()=>{} ); 
    this.storage.set("QualplanoSel", plano.idplano).then( ()=>{} ); 
    this.storage.set("QualNivelNome", plano.Titulo).then( ()=>{} ); 
    this.storage.set("QualNivelValor", plano.Valor).then( ()=>{} ); 
    this.storage.set("QualNivelBundle", plano.bundle_id).then( ()=>{} );     

    var link = 'http://app.progettoapp.com.br/midias-lider/cadastrar_pag.php';
    var myData = JSON.stringify(
      { 
        acao: 'planos', 
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
    
    let alert = this.alertCtrl.create({
      title: 'Aguarde!',
      subTitle: "Estamos sincronizando o conteúdo..."
    });
    alert.present(); 

    this.storage.set('Status', 'Logado');
    this.storage.set('SlideOlhou', 'Sim');

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

    setTimeout(() => {
      this.navCtrl.setRoot(TimelinePage);
      window.location.reload();
    }, 500); 

    /*
    if(this.AssinarCliqueAcao == '1'){
      this.navCtrl.push(MinhaContaPrivacidadePage);
    }else{
      this.navCtrl.push(PrivacidadePage);
    }
    */
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
