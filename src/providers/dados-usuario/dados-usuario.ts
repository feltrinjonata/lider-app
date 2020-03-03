import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Network } from  '@ionic-native/network';
import 'rxjs/add/operator/toPromise';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

@Injectable()
export class DadosUsuarioProvider {

  api : string ='http://app.progettoapp.com.br/midias-lider/';
  Qual_iduser : any = {}; 
  Use_plano_geral : any = {}; 
  page: number;

  constructor(
    public http: Http, 
    public storage: Storage,
    public network:  Network,
    private alertCtrl: AlertController,    
    private iap: InAppPurchase    
  ){
    
    this.conexaoApp();
    this.userDadosGuardados();
    //this.getNovidades(page);

  }

  login(email: string, senha: string, DeviceIDQual: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        senha: senha,
        DeviceID: DeviceIDQual
      };
      this.http.post(this.api + 'login_apps.php', data).subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  conexaoApp(){

    this.network.onDisconnect().subscribe(data => {

      let alert = this.alertCtrl.create({
        enableBackdropDismiss: false,                  
        title: 'Offline',
        message: 'Você está sem internet no momento.',
        buttons: [            
          {
            text: 'Ok',
            handler: () => {
              //loading.onDidDismiss(() => { });
            }
          }
        ]
      })
      alert.present();

    },
    error => console.log(error));

  }

	userDadosGuardados(){  

		this.storage.get('QualplanoSel').then((val) => {
      if(val == null){
        this.Use_plano_geral = '0';
      }else{
        this.Use_plano_geral = val;
      }        
    });

		this.storage.get('QualUser').then((val) => {
      if(val == null){
        this.Qual_iduser = '1';
      }else{
        this.Qual_iduser = val;
      }
    });      
 
  }  
  
  getPlanos(){
    return this.http.get(this.api + 'planos.php').map(res=>res.json()) 
  }
  getPlanosQual(){
    return this.http.get(this.api + 'planos_qual.php?p='+this.Use_plano_geral+'&uu='+this.Qual_iduser).map(res=>res.json()) 
  }
  // GERAIS
  getNotificacao(){
    return this.http.get(this.api + 'lista_notificacoes.php').map(res=>res.json()) 
  }
  getBuscar() {
    return this.http.get(this.api + 'buscar.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  getPrivacidade() {
    return this.http.get(this.api + 'privacidade.php').map(res=>res.json())
  }
  getTermos() {
    return this.http.get(this.api + 'termos.php').map(res=>res.json())
  }  
  getDicionario() {
    return this.http.get(this.api + 'dicio.php').map(res=>res.json())
  }
  getEventos() {
    return this.http.get(this.api + 'eventos.php').map(res=>res.json())
  }
  getEventosValores(){
    return this.http.get(this.api + 'eventos_valores_vinc.php').map(res=>res.json())
	}
  getEventosAntigos() {
    return this.http.get(this.api + 'eventos-antigos.php').map(res=>res.json())
  }
  getEventosFotos() {
    return this.http.get(this.api + 'eventos-fotos.php').map(res=>res.json())
  }
  getAovivo(){
    return this.http.get(this.api + 'aovivo.php').map(res=>res.json()) 
  }
  getAovivoArquivos(){
    return this.http.get(this.api + 'aovivo_arquivos.php').map(res=>res.json()) 
  }

  getVerificador(){
    return this.http.get(this.api + 'verificador.php?uu='+this.Qual_iduser).map(res=>res.json())
  }
  getQualPlanoBundle(){
    return this.http.get(this.api + 'planosApple.php?p='+this.Use_plano_geral).map(res=>res.json())
  }

  // NOVIDADES
  getNovidades(){
    return this.http.get(this.api + 'lista_novi.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  getNovidades2(page: number, totalPage: number){
    let urlNova = this.api + 'lista_novi.php?p=' + this.Use_plano_geral + '&per_page=' + totalPage + '&page=0';
    return this.http.get(urlNova).map(res=>res.json())
  }

  getCurtidas(){
    return this.http.get(this.api + 'curtidas.php').map(res=>res.json()) 
  }
  getComentarios(){
    return this.http.get(this.api + 'comentarios.php').map(res=>res.json()) 
  }

  // PUBLICACOES
  getLivros() {
    console.log('lista livros:', this.Use_plano_geral);
    return this.http.get(this.api + 'lista_livros.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  getLivrosCategorias() {
    console.log('cat livros:', this.Use_plano_geral);
    return this.http.get(this.api + 'cat_livros.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
 // getLivrosRelacionados() {
  //  return this.http.get(this.api + 'lista_livros.php?p='+this.Use_plano_geral).map(res=>res.json())
  //}

  // LIDER - PL
  getRevistaPl() {
    return this.http.get(this.api + 'lista_pl.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  getPlCategorias() {
    return this.http.get(this.api + 'cat_pl.php?p='+this.Use_plano_geral).map(res=>res.json())
  } 
  //getRevistaPlRelacionados() {
  //  return this.http.get(this.api + 'lista_pl_relacionados.php?p='+this.Use_plano_geral).map(res=>res.json())
 // }

  // AULAS
  getData() {
    return this.http.get(this.api + 'lista_videos.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  getVideosCategorias() {
    return this.http.get(this.api + 'cat_videos.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  //getVideosRelacionados() {
   // return this.http.get(this.api + 'lista_videos_relacionados.php?p='+this.Use_plano_geral).map(res=>res.json())
  //}

  // ONTOARTE
  getConcerto() {
    return this.http.get(this.api + 'lista_concerto.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  getAlbuns() {
    return this.http.get(this.api + 'lista_albuns.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  getAudios() {
    return this.http.get(this.api + 'lista_audios.php?p='+this.Use_plano_geral).map(res=>res.json())
  }
  getAlbunsBooks() {
    return this.http.get(this.api + 'lista_albuns_books.php?p='+this.Use_plano_geral).map(res=>res.json())
  }  
  getAudioBooks() {
    return this.http.get(this.api + 'lista_audio_books.php?p='+this.Use_plano_geral).map(res=>res.json())
  }

  enviaContador(modulo, id){
    return this.http.get(this.api + 'contador.php?u='+this.Qual_iduser+'&m='+modulo+'&i='+id).map(res=>res.json())
  }  

  // Apple Recibo Ver
  getAppleReciboVer() {
    return this.http.get(this.api + 'appleReciboVer.php?uu='+this.Qual_iduser).map(res=>res.json())
  }  

  enviaApple() {
    return this.http.get(this.api + 'lista_cds_dvs.php?p='+this.Use_plano_geral).map(res=>res.json())
  }  
}
