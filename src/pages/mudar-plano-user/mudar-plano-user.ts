import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, Loading, ToastController, ModalController, ViewController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';
import { MudarPlanoAssinarPage } from '../mudar-plano-assinar/mudar-plano-assinar';
import { MudarPrivacidadePage } from '../mudar-privacidade/mudar-privacidade';

@Component({
  selector: 'page-mudar-plano-user',
  templateUrl: 'mudar-plano-user.html',
}) 
export class MudarPlanoUserPage {
  
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
    
    this.getPlanos2();

    this.storage.get('QualUser').then((val) => {
      this.Qual_iduser = val;
    }); 

		this.storage.get('QualplanoSel').then((val) => {
      this.PlanoSelecionado = val; 
    });
  }
  
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  getPlanos2() {
    //retorno de Dados
    this.service.getPlanos()
    .subscribe(
        data=> this.relPlanos = data.rows,
        err=> console.log(err)        
    );
  }

  selecionarPlano(plano){
    /*
    this.storage.set("QualNivel", plano.idplano).then( ()=>{} ); 
    this.storage.set("QualplanoSel", plano.idplano).then( ()=>{} ); 
    this.storage.set("QualNivelNome", plano.Titulo).then( ()=>{} ); 
    this.storage.set("QualNivelValor", plano.Valor).then( ()=>{} ); 
    this.storage.set("QualNivelBundle", plano.bundle_id).then( ()=>{} );       
    */
    this.storage.set("MudarPlanoId", plano.idplano).then( ()=>{} ); 
    this.storage.set("MudarPlanoTitulo", plano.Titulo).then( ()=>{} ); 
    this.storage.set("MudarPlanoValor", plano.Valor).then( ()=>{} ); 
    this.storage.set("MudarPlanoBundle", plano.bundle_id).then( ()=>{} );     


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
              
    this.storage.get('MudarPlanoId').then((val) => {
      this.storage.set('QualplanoSel', val);
    });        
    this.storage.get('MudarPlanoBundle').then((val) => {
      this.storage.set('QualNivelNome', val);
    });   
    this.storage.get('MudarPlanoTitulo').then((val) => {
      this.storage.set('QualPlano', val);
    });   
    this.storage.get('MudarPlanoTitulo').then((val) => {
      this.storage.set('QualNivelNome', val); 
    })
    this.storage.get('QualNivelValor').then((val) => {
      this.storage.set('MudarPlanoValor', val);
    })   

    setTimeout(() => {
      this.navCtrl.setRoot(TimelinePage);
      window.location.reload();
    }, 500); 

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