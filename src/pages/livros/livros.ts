import { Storage } from '@ionic/storage';
import { Component } from '@angular/core'; 
import { NavParams, NavController, Platform, AlertController, ModalController } from 'ionic-angular'; 
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ToastController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser'
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';

import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { LoadingController } from 'ionic-angular';
//import { FileOpener } from '@ionic-native/file-opener';
import { PdfPage } from '../pdf/pdf';

import { VerlivroPage } from '../verlivro/verlivro';
import { LojaVerPage } from '../loja-ver/loja-ver';
import { VideosPage } from '../videos/videos';
import { LojaModalPage } from '../loja-modal/loja-modal';
 
import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { OntoarteVerPage } from './../ontoarte-ver/ontoarte-ver';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { AssinarDegustacaoPage } from '../assinar-degustacao/assinar-degustacao';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';
import { PlanosAndroidMudarPage } from '../planos-android-mudar/planos-android-mudar';
import { AcabouTestePlanosPage } from '../acabou-teste-planos/acabou-teste-planos';
import { AcabouTestePlanosAndroidPage } from '../acabou-teste-planos-android/acabou-teste-planos-android';
import { PlListaPage } from '../pl-lista/pl-lista';

@Component({
  selector: 'page-livros',
  templateUrl: 'livros.html',
})
export class LivrosPage {

  item = []; 
  urlArquivo:any = '';
  teste = [];   
  teste2 = []; 
  
  icone : string = 'ico-mais';

  icoCurtir : string = 'Curtir';
  icoCurtirImg : string = '';
  
  data:any ={};

  relLivros = '';
  relBooks = '';
  relVideos = '';
  relMaterias = ''; 

  constructor(
    private socialSharing: SocialSharing,
    public http: Http, 
    public navCtrl: NavController, 
    private Storage: Storage, 
    public platform: Platform,
    public service : DadosUsuarioProvider, 
    private iab: InAppBrowser, 
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController, 
    public navParams: NavParams,
    private themeableBrowser: ThemeableBrowser,
    public modalCtrl : ModalController
  ){

    this.relLivros;
    this.getDados();
    this.getVincLivros();
    this.getVincPl();        
    this.getVideosVinc();
    
  }
  
  ionViewWillEnter() {

    // --- VERIFICADOR DE PAGAMENTO ------------------------------------------------------------------------------------------ //
    /*
    this.service.getVerificador().subscribe(
      data => {
        if(data.rows[0].Verificador == '0'){
        
          //verifica a salva da data salva no storage
          this.Storage.get('dataMsg').then((val) => {
          
            // sendo diferente mostra a msg e salva a nova daya  
            if(data.rows[0].dataMsg != val || data.rows[0].tipoMsg == '1'){

              //mostra a mesagem
              let alert = this.alertCtrl.create({
                enableBackdropDismiss: false,
                title: 'Aviso!',
                subTitle: data.rows[0].VerMsg,
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => { 
                      
                      // se passou os 7 dias e nao tem mais acesso
                      if(data.rows[0].tipoMsg == '1'){

                        setTimeout(() => {
                          // androi_dVerificador - tem que buscar e mudar isso em todas as telas
                          //this.navCtrl.push(AcabouTestePlanosAndroidPage);
                          // ios -  - tem que buscar e mudar isso em todas as telas
                          this.navCtrl.push(AcabouTestePlanosPage);
                        }, 500);
                        
                      }else{
                                  
                        //salva no banco de dados
                        this.Storage.set('dataMsg', data.rows[0].dataMsg);      

                      }

                    }
                  }
                ]
              }); 
              alert.present();         

            }

          })  
                 
        }
      },
      err => console.log(err)  
    );
    */
    // --- FIM DO VERIFICADOR DE PAGAMENTO ------------------------------------------------------------------------------------------ //
    
  }

  api2 : string =  'http://app.progettoapp.com.br/midias-lider/';
  api : string =  'http://app.progettoapp.com.br/arquivos/r';
  api3 : string =  'http://app.progettoapp.com.br/arquivos/r';

   // --- COMPARTILHAR --- // 
    //compilemsg(index):string{
      //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
      //return msg.concat(" \n sent from my awesome app");
    //}
    regularShare(msg, assunto, file, link){
      //var msg = this.compilemsg(msg);
      this.socialSharing.share(msg, assunto, file, link);
    }

    getDados() {

      this.service.getLivros();
      this.item = this.navParams.get('item');
      //console.log(this.item);
      
      var imgFinal = 'http://app.progettoapp.com.br/arquivos/r/' + this.item['Caminho'] + '/' + this.item['Pasta'] + '/' + this.item['Img'] + '_400.jpg';
      //console.log(imgFinal);
      
      // ADD MINHA LISTA
      this.Storage.ready().then(()=>{
        this.Storage.get("MinhaListaLivros").then( (data)=>{
          
          let nedo=0;
          this.teste = data;

          if(data==null || data==false || data.length==0){
  
            //this.showEmptCartMessage= true;   
          
          }else{
            
            this.teste.forEach( (item, index)=>{

              if(this.item['idlivro'] == item['idlivro']){
                nedo=1;
              }

            })
            
          }

          if(nedo==1){
            this.icone = 'ico-correto';
          }else{
            this.icone = 'ico-mais';
          }

        })
      })

      // ADD CURTIR
      this.Storage.ready().then(()=>{
        this.Storage.get("ClassficarLivro").then( (data)=>{
          
          let nedo2=0;

          this.teste2 = data;
  
          if(data==null || data.length==0){
  
            //this.showEmptCartMessage= true;   
          
          }else{

            this.teste2.forEach( (item, index)=>{

              if(this.item['idlivro'] == item['idlivro']){
                nedo2=1;
              }

            })
            
          }

          if(nedo2==1){
            this.icoCurtir = 'Curtiu';
            this.icoCurtirImg = '-s';
          }else{
            this.icoCurtir = 'Curtir';
            this.icoCurtirImg = '';
          }

        })
      }) 
           
    }

    selecionado(item: string){  
      
      // android    
      this.navCtrl.push(VerlivroPage, { item });
 
      // ios
      /*
      const options: ThemeableBrowserOptions = {
        statusbar: {
          color: '#111111'
        },      
        toolbar: {
          height: 32,
          color: '#242424'
        },
        title: {
          color: '#b89941',
          showPageTitle: false,
          staticText: '',
        },
        //backButton: {
          //wwwImage: 'assets/imgs/back.png',
          //align: 'left',
         // event: 'backPressed'
        //},
        //forwardButton: {
          //wwwImage: 'assets/imgs/forward.png',
          //align: 'left', 
          //event: 'forwardPressed'
        //},
        closeButton: {
          wwwImage: 'assets/imgs/close.png',
          align: 'left',
          event: 'closePressed',
        },    
      };

      this.urlArquivo = this.api + '/' + this.item['Caminho'] + '/' + this.item['Pasta'] + '/' + this.item['Arquivo'];
      this.service.enviaContador('livros', this.item['idlivro']).subscribe();
      const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.urlArquivo, '_blank', options);
  
      browser.on('closePressed').subscribe(data => {
        browser.close();
      }) 
      */
    }

    selecionaLoja(item: string) {    
      this.navCtrl.push(LojaModalPage, { item });
    }   

    getVincLivros() {

      this.item = this.navParams.get('item');

      this.Storage.get('QualplanoSel').then((val) => {
        this.http.get(this.api2 + 'lista_livros_relacionados.php?p='+val+'&q='+this.item['idlivro']+'&est=livro').map(res=>res.json()).subscribe(
          data=>{
            this.relBooks = data.rows;
          }, 
          err=> console.log(err),
        );
      }); 

    }
    getVincPl() {

      this.item = this.navParams.get('item');
  
      this.Storage.get('QualplanoSel').then((val) => {
        this.http.get(this.api2 + 'lista_pl_relacionados.php?p='+val+'&q='+this.item['idlivro']+'&est=livro').map(res=>res.json()).subscribe(
          data=> this.relMaterias = data.rows,
          err=> console.log(err),
        );
      }); 
  
    }    
    getVideosVinc() {
     
      this.item = this.navParams.get('item');
      
      this.Storage.get('QualplanoSel').then((val) => {
        this.http.get(this.api2 + 'lista_videos_relacionados.php?p='+val+'&q='+this.item['idlivro']+'&est=livro').map(res=>res.json()).subscribe(
          data=>{
            this.relVideos = data.rows;
          },
          err=> console.log(err),
        );
        
      }); 
  
    }

  selecionaVinc(item: string){ this.navCtrl.push(LivrosPage, { item } ); }  
  selecionadoVideosVinc(item: string){ this.navCtrl.push(VideosPage, { item } ); }  
  selecionadoPlVinc(item: string){ this.navCtrl.push(PlListaPage, { item } ); }  

  AddMinhaLista(item){

    let added=0;

    this.Storage.get("MinhaListaLivros").then((data)=>{
              
      if(data==null || data.length==0){
          
        data = [];
        /*
        this.toastCtrl.create({
          message: "Públicação adicionada na sua lista!",
          duration: 2000,
          position: 'middle',
        }).present();*/
        
        data.push({
          "idlivro": item.idlivro,
          "Cat": item.Cat,
          "Arquivo": item.Arquivo,
          "arquivoCompleto": item.arquivoCompleto,
          "Data": item.Data,
          "Titulo": item.Titulo,
          "Subitulo": item.Subitulo,
          "Descricao": item.Descricao,
          "Caminho": item.Caminho,
          "Pasta": item.Pasta,
          "Img": item.Img,
          "paginas": item.paginas,
          "Valor": item.Valor,
          "Desconto": item.Desconto,          
          "Ativo": item.Ativo
        });

        added=1;

      }else{
         
        for(let i=0 ; i<data.length ; i++){

          if(item.idlivro == data[i].idlivro){
            /*
            this.toastCtrl.create({
              message: "Públicação removida da sua lista!",
              duration: 2000,
              position: 'middle',
            }).present();*/

            const query = data.find(item => item.idlivro === data[i].idlivro);

            const toremove = data.indexOf(query);

            data.splice(toremove,1);

            added=1;

          }

        }

      }
    
     if(added==0){

        this.icone = 'ico-correto';

        data.push({
          "idlivro": item.idlivro,
          "Cat": item.Cat,
          "Arquivo": item.Arquivo,
          "arquivoCompleto": item.arquivoCompleto,
          "Data": item.Data,
          "Titulo": item.Titulo,
          "Subitulo": item.Subitulo,
          "Descricao": item.Descricao,
          "Caminho": item.Caminho,
          "Pasta": item.Pasta,
          "Img": item.Img,
          "paginas": item.paginas,
          "Valor": item.Valor,
          "Desconto": item.Desconto,          
          "Ativo": item.Ativo
        });
        /*
        this.toastCtrl.create({
          message: "Públicação adicionada na sua lista!",
          duration: 2000,
          position: 'middle',
        }).present();*/

      }

      if(added==1){ this.icone = 'ico-mais'; }

      this.Storage.set("MinhaListaLivros", data).then( ()=>{} );
    
    });
  }

  ClassficarLivro(item){

    let added=0;

    this.Storage.get("ClassficarLivro").then((data)=>{

      if(data==null || data.length==0){
          
        data = [];
        /*
        this.toastCtrl.create({
          message: "Você marcou o gostei nessa públicação!",
          duration: 2000,
          position: 'middle',
        }).present();*/
        
        data.push({
          "idlivro": item.idlivro
        });

        added=1;

      }else{
         
        for(let i=0 ; i<data.length ; i++){

          if(item.idlivro == data[i].idlivro){

            /*this.toastCtrl.create({
              message: "Você desmarcou o gostei nessa públicação!",
              duration: 2000,
              position: 'middle',
            }).present();*/

            const query = data.find(item => item.idlivro === data[i].idlivro);

            const toremove = data.indexOf(query);

            data.splice(toremove,1);

            added=1;

          }

        }

      }
    
     if(added==0){

        data.push({
          "idlivro": item.idlivro
        });
        /*
        this.toastCtrl.create({
          message: "Você marcou o gostei nessa públicação!",
          duration: 2000,
          position: 'middle',
        }).present();*/
               
      }

      if(added==1){

        this.icoCurtir = 'Curtir'; 
        this.icoCurtirImg = '';

        //ENVIA O INSERT
        let headerOptions: any = { 'Content-Type': 'application/json' };
        let headers = new Headers(headerOptions);
        var link = 'http://app.progettoapp.com.br/midias-lider/curtir_update.php';
        this.http.post(link, JSON.stringify({
          idqual: item.idlivro,
          modulo: 'livros',
          acao: 'menos'
        })).subscribe(data => {
          //this.submitDetalhePedido(this.numero_pedido, gUsuario.email);
        });  

      }else{
 
        //ENVIA O INSERT
        let headerOptions: any = { 'Content-Type': 'application/json' };
        let headers = new Headers(headerOptions);
        var link = 'http://app.progettoapp.com.br/midias-lider/curtir_update.php';
        this.http.post(link, JSON.stringify({
          idqual: item.idlivro,
          modulo: 'livros',
          acao: 'mais'
        })).subscribe(data => {
          //this.submitDetalhePedido(this.numero_pedido, gUsuario.email);
        });                
        this.icoCurtir = 'Curtiu';  
        this.icoCurtirImg = '-s';
         
      }
     
      this.Storage.set("ClassficarLivro", data).then( ()=>{} );
    
    });
  }

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaTitulos(){
    this.navCtrl.setRoot(TitulosPage);
  }
  abrirPaginaPublicacoes(){
    this.navCtrl.setRoot(TitulosLivrosPage);
  }
  abrirPaginaPl(){
    this.navCtrl.setRoot(RevistaPlPage);
  }
  abrirPaginaOntoarte(){
    this.navCtrl.setRoot(OntoartePage);
  }  
  abrirPaginaAovivo(){
    this.navCtrl.setRoot(AovivoVideosPage);
  } 
  abrirPaginaAreaUsuarioRestrita(){
    this.navCtrl.setRoot(AreaUsuarioRestritaPage);
  } 
  abrirPaginaEventos(){
    this.navCtrl.setRoot(EventosPage);
  }  
  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage);
  }
  

/*public openWithSystemBrowser(url : string){
    let target = "_system";
    this.iab.create(url,target,this.options);
}
public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.iab.create(url,target,this.options);
}
public openWithCordovaBrowser(url : string){
    let target = "random_string";
    this.iab.create(url,target,this.options);
}      */
    



}
