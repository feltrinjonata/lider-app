import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ToastController, AlertController, InfiniteScroll } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from  '@ionic-native/network';

import { VideosPage } from '../videos/videos';
import { LivrosPage } from './../livros/livros';

import { PlListaPage } from '../pl-lista/pl-lista';
import { Audios2Page } from '../audios2/audios2';
import { ComentariosPage } from '../comentarios/comentarios';

import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { DicionarioPage } from '../dicionario/dicionario';
import { AssinarDegustacaoPage } from '../assinar-degustacao/assinar-degustacao';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';
import { AcabouTestePlanosPage } from '../acabou-teste-planos/acabou-teste-planos';
import { AcabouTestePlanosAndroidPage } from '../acabou-teste-planos-android/acabou-teste-planos-android';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
      
  item = []; 

	data: any = {}; 
	resolucao = '';

	myDate: any = {};

	icoCurtirAulas: string = 'ico-curtir-novi.png';
  icoCurtirPl: string = 'ico-curtir-novi.png';
  icoCurtirLivros: string = 'ico-curtir-novi.png';
  icoCurtirMusicas: string = 'ico-curtir-novi.png';
  relCurtidas = '';

  testeAulas = []; 
  storeData = [];
	relnovidades: any = {};
  
  totalPage: number;
  relnovidadesPega = '';
  page: number;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;  
  
  relVideos = '';
	IdUserQual: any = {};
	EmailUserQual: any = {};
	NomeUserQual: any = {};
	NivelUserQual: any = {};
	PlanoUserQual: any = {};
	FotoUserQual: any = {};
	qtdePublicacoes: any;
	numerosNovidades: any;
	numerosNovidadesAtual: any;
   
	constructor(
		private socialSharing: SocialSharing,
    public http: Http, 
    private Storage: Storage, 
    public navCtrl: Nav, 
    public service: DadosUsuarioProvider,
    private storage: Storage,
    private alertCtrl: AlertController,   
    public loadingCtrl: LoadingController
  ){
    
    this.storage.get('QualUser').then((val) => {
      this.IdUserQual = val;
    });

		this.myDate = new Date().toISOString();

  }
  
  api : string =  'http://app.progettoapp.com.br/arquivos/r';  
  
  ionViewDidLoad(){

    this.userDadosGuardados();

  }
  
  ionViewDidEnter(){

    this.userDadosGuardados();

    //this.users = [];
    this.page = 1;
    this.totalPage = 5;
    this.infiniteScroll.enable(true);
    this.getDadosPega(this.page, this.totalPage);

  }  

	ionViewWillEnter(){
    
    this.storage.get('PrimeiroAcesso').then((val) => {
      console.log('aaa', val);
      if(val != null){
        /*
    // --- VERIFICADOR DE PAGAMENTO ------------------------------------------------------------------------------------------ //
    this.service.getVerificador().subscribe(
      data => {
        if(data.rows[0].Verificador == '0'){
        
          //verifica a salva da data salva no storage
          this.storage.get('dataMsg').then((val) => {
          
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
                        this.storage.set('dataMsg', data.rows[0].dataMsg);      

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
    });

    this.userDadosGuardados();

		this.service.getNovidades().subscribe(
			data => {
        this.relnovidades = data.rows;
              				
				this.storage.get('relNovidades').then((val) => {
					if(val != null ){
            this.numerosNovidades = val.length;
					}else{
						this.storage.set('relNovidades', this.relnovidades)
					}
				});
				this.storage.get('numeroPublicacoes').then((val) => {
					if(val != null){
						this.numerosNovidadesAtual = val;
					}else{
            this.storage.set('numeroPublicacoes', this.relnovidades.length)
            var numero = 0;
            this.nNovidades(this.relnovidades.length, numero);
					}
				});		
			},
			err => console.log(err)
		);
    
  }

  nNovidades(total: number, dados:number){
    console.log('total', total);
    console.log('dados', dados);
    this.qtdePublicacoes = total - dados;
    if(this.qtdePublicacoes < 1){ this.qtdePublicacoes = 0; }
		console.log('qtdePublicacoes', this.qtdePublicacoes)
  }
  
	doInfinite() {

    this.storage.get('numeroPublicacoes').then((val) => {
      if(val != null){
        this.numerosNovidadesAtual = val;
      }else{
        this.storage.set('numeroPublicacoes', this.relnovidades.length)
      }
    });

    setTimeout(() => {
      
      if(this.relnovidades.length >= this.numerosNovidadesAtual){
        this.storage.set('relNovidades', this.relnovidades);
        this.storage.set('numeroPublicacoes', this.relnovidades.length);
      }
      
      this.totalPage = this.totalPage+5;
      this.nNovidades(this.relnovidades.length, this.totalPage);
      this.page += 1;
      this.getDadosPega(this.page, this.totalPage);
      
    }, 500);

  }
  
  getDadosPega(page: number, totalPage: number){

    this.service.getNovidades2(page, totalPage).subscribe(
			data => {
        console.log('total page', totalPage); 
        for (var i = 0; i <= totalPage; i++) {
          this.relnovidadesPega = data.rows; 
        }

        if(this.infiniteScroll){
          
          this.infiniteScroll.complete();

          if(this.relnovidadesPega.length == 5){
            this.infiniteScroll.enable(false);
          }

        } 

			},
			err => console.log(err)
    );    
  }  
  
   // --- COMPARTILHAR --- // 
    //compilemsg(index):string{
      //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
      //return msg.concat(" \n sent from my awesome app");
    //}
    regularShare(msg, assunto, file, link){
      //var msg = this.compilemsg(msg);
      this.socialSharing.share(msg, assunto, file, link);
    }
  
  getDadosCurtidas() {
    this.service.getCurtidas()
    .subscribe(
			data => {
        this.relCurtidas = data.rows;  
			},
			err => console.log(err)
    );
  }

  abrirComentarios(idqualSel: string, moduloSel: string) {    
    this.navCtrl.push(ComentariosPage, { idqualSel, moduloSel });
  }     

    selecionarNovidades(item: string) {    

      if(item['Tipo'] == 'video'){

        this.navCtrl.push(VideosPage, { item });
      }else if(item['Tipo'] == 'pl'){

          this.navCtrl.push(PlListaPage, { item });

        }else if(item['Tipo'] == 'musica'){

          this.navCtrl.push(Audios2Page, { item });

      }else{

        this.navCtrl.push(LivrosPage, { item });

      }

    } 

    ClassficarLivro(item){

      let added=0;
  
      this.Storage.get("ClassficarLivro").then((data)=>{
          
        if(data==null || data.length==0){
            
          data = [];

          data.push({
            "idlivro": item.idlivro
          });
  
          added=1;
  
        }else{

          for(let i=0 ; i<data.length ; i++){
  
            if(item.idlivro == data[i].idlivro){
  
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
         
        }
  
        if(added==1){

          this.icoCurtirLivros = 'ico-curtir-s.png';
  
          //ENVIA O INSERT
          let headerOptions: any = { 'Content-Type': 'application/json' };
          let headers = new Headers(headerOptions);
          var link = 'http://app.progettoapp.com.br/midias-lider/curtir_update.php';
          this.http.post(link, JSON.stringify({
            idqual: item.idlivro,
            user_id_qual: this.IdUserQual,
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
            user_id_qual: this.IdUserQual,
            modulo: 'livros',
            acao: 'mais'
          })).subscribe(data => {
            //this.submitDetalhePedido(this.numero_pedido, gUsuario.email);
          }); 
    
          this.icoCurtirLivros = 'ico-curtir.jpg';
           
        }
  
        this.Storage.set("ClassficarLivro", data).then( ()=>{} );
      
      });
    }

    ClassficarPl(item){

      let added=0;
  
      this.Storage.get("ClassficarPl").then((data)=>{
          
        if(data==null || data.length==0){
            
          data = [];
          
          /*this.toastCtrl.create({
            message: "Você marcou o gostei nessa revista!",
            duration: 2000,
            position: 'middle',
          }).present();*/
          
          data.push({
            "idpl": item.idpl
          });
  
          added=1;
  
        }else{

          for(let i=0 ; i<data.length ; i++){
  
            if(item.idpl == data[i].idpl){
  
              /*this.toastCtrl.create({
                message: "Você desmarcou o gostei nessa revista!",
                duration: 2000,
                position: 'middle',
              }).present();*/
  
              const query = data.find(item => item.idpl === data[i].idpl);
  
              const toremove = data.indexOf(query);
  
              data.splice(toremove,1);
  
              added=1;
  
            }
  
          }

        }
      
       if(added==0){
  
          data.push({
            "idpl": item.idpl
          });
  
          /*this.toastCtrl.create({
            message: "Você marcou o gostei nessa revista!",
            duration: 2000,
            position: 'middle',
          }).present();*/
         
        }
  
        if(added==1){

          //icoCurtirAulas: string = 'ico-curtir-aulas.jpg';
          //icoCurtirPl: string = 'ico-curtir-pl.jpg';
          //icoCurtirLivros: string = 'ico-curtir.jpg';
          //icoCurtirMusicas: string = 'ico-curtir-musica.jpg';
  
          //ENVIA O INSERT
          let headerOptions: any = { 'Content-Type': 'application/json' };
          let headers = new Headers(headerOptions);
          var link = 'http://app.progettoapp.com.br/midias-lider/curtir_update.php';
          this.http.post(link, JSON.stringify({
            idqual: item.idpl,
            modulo: 'pl',
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
            idqual: item.idpl,
            modulo: 'pl',
            acao: 'mais'
          })).subscribe(data => {
            //this.submitDetalhePedido(this.numero_pedido, gUsuario.email);
          }); 
  
          //icoCurtirAulas: string = 'ico-curtir-aulas.jpg';
          //icoCurtirPl: string = 'ico-curtir-pl.jpg';
          //icoCurtirLivros: string = 'ico-curtir.jpg';
          //icoCurtirMusicas: string = 'ico-curtir-musica.jpg';

        }
  
        this.Storage.set("ClassficarPl", data).then( ()=>{} );
      
      });
    }

    ClassficarAula(item){

      let added=0;
  
      this.Storage.get("ClassficarAulas").then((data)=>{
          
        if(data==null || data.length==0){
            
          data = [];
          
          /*this.toastCtrl.create({
            message: "Você marcou o gostei nessa aula!",
            duration: 2000,
            position: 'middle',
          }).present();*/
          
          data.push({
            "idvideo": item.idvideo
          });
  
          added=1;
  
        }else{

          for(let i=0 ; i<data.length ; i++){
  
            if(item.idvideo == data[i].idvideo){
  
              /*this.toastCtrl.create({
                message: "Você desmarcou o gostei nessa aula!",
                duration: 2000,
                position: 'middle',
              }).present();*/
  
              const query = data.find(item => item.idvideo === data[i].idvideo);
  
              const toremove = data.indexOf(query);
  
              data.splice(toremove,1);
  
              added=1;
  
            }
  
          }

        }
      
       if(added==0){
  
          data.push({
            "idvideo": item.idvideo
          });
         
        }
  
        if(added==1){
  
          //ENVIA O INSERT
          let headerOptions: any = { 'Content-Type': 'application/json' };
          let headers = new Headers(headerOptions);
          var link = 'http://app.progettoapp.com.br/midias-lider/curtir_update.php';
          this.http.post(link, JSON.stringify({
            idqual: item.idvideo,
            modulo: 'videos',
            acao: 'menos'
          })).subscribe(data => {
            //this.submitDetalhePedido(this.numero_pedido, gUsuario.email);
          });  

          this.icoCurtirAulas = 'ico-curtir-s.png';
          console.log('vai', this.icoCurtirAulas);

        }else{
   
          //ENVIA O INSERT
          let headerOptions: any = { 'Content-Type': 'application/json' };
          let headers = new Headers(headerOptions);
          var link = 'http://app.progettoapp.com.br/midias-lider/curtir_update.php';
          this.http.post(link, JSON.stringify({
            idqual: item.idvideo,
            modulo: 'videos',
            acao: 'mais'
          })).subscribe(data => {
            //this.submitDetalhePedido(this.numero_pedido, gUsuario.email);
          }); 
  
          this.icoCurtirAulas = 'ico-curtir-aulas.jpg';
          console.log('vai', this.icoCurtirAulas);
          
        }
  
        this.Storage.set("ClassficarAulas", data).then( ()=>{} );
      
      });
    }

    ClassficarAlbum(item){

      let added=0;
  
      this.Storage.get("ClassficarAlbum").then((data)=>{
          
        if(data==null || data.length==0){
            
          data = [];
          
          /*this.toastCtrl.create({
            message: "Você marcou o gostei nesse álbum!",
            duration: 2000,
            position: 'middle',
          }).present();*/
          
          data.push({
            "idalbum": item.idalbum
          });
  
          added=1;
  
        }else{

          for(let i=0 ; i<data.length ; i++){
  
            if(item.idalbum == data[i].idalbum){
  
              /*this.toastCtrl.create({
                message: "Você desmarcou o gostei nesse álbum!",
                duration: 2000,
                position: 'middle',
              }).present();*/
  
              const query = data.find(item => item.idalbum === data[i].idalbum);
  
              const toremove = data.indexOf(query);
  
              data.splice(toremove,1);
  
              added=1;
  
            }
  
          }

        }
      
       if(added==0){
  
          data.push({
            "idalbum": item.idalbum
          });
  
          /*this.toastCtrl.create({
            message: "Você marcou o gostei nesse álbum!",
            duration: 2000,
            position: 'middle',
          }).present();*/
         
        }
  
        if(added==1){

          //icoCurtirAulas: string = 'ico-curtir-aulas.jpg';
          //icoCurtirPl: string = 'ico-curtir-pl.jpg';
          //icoCurtirLivros: string = 'ico-curtir.jpg';
          //icoCurtirMusicas: string = 'ico-curtir-musica.jpg';
  
          //ENVIA O INSERT
          let headerOptions: any = { 'Content-Type': 'application/json' };
          let headers = new Headers(headerOptions);
          var link = 'http://app.progettoapp.com.br/midias-lider/curtir_update.php';
          this.http.post(link, JSON.stringify({
            idqual: item.idalbum,
            modulo: 'albuns',
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
            idqual: item.idalbum,
            modulo: 'albuns',
            acao: 'mais'
          })).subscribe(data => {
            //this.submitDetalhePedido(this.numero_pedido, gUsuario.email);
          }); 
  
          //icoCurtirAulas: string = 'ico-curtir-aulas.jpg';
          //icoCurtirPl: string = 'ico-curtir-pl.jpg';
          //icoCurtirLivros: string = 'ico-curtir.jpg';
          //icoCurtirMusicas: string = 'ico-curtir-musica.jpg';
           
        }
  
        this.Storage.set("ClassficarAlbum", data).then( ()=>{} );
      
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
    abrirPaginaDicionario(){
      this.navCtrl.setRoot(DicionarioPage);
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
    userDadosGuardados(){

      /*console.log('cordova: ' + this.device.cordova);
      console.log('model: ' + this.device.model);
      console.log('platform: ' + this.device.platform);
      console.log('uuid: ' + this.device.uuid);      
      console.log('version: ' + this.device.version);
      console.log('manufacturer: ' + this.device.manufacturer);
      console.log('isVirtual: ' + this.device.isVirtual);
      console.log('serial: ' + this.device.serial);*/

      this.storage.get('QualUser').then((val) => {
        console.log(val)
        this.IdUserQual = val;
      })
      this.storage.get('QualEmail').then((val) => {
        console.log(val)
        this.EmailUserQual = val;
      })
      this.storage.get('QualNome').then((val) => {
        console.log(val)
        this.NomeUserQual = val;
      })
      this.storage.get('QualNivel').then((val) => {
        console.log(val)
        this.NivelUserQual = val;
      })
      this.storage.get('QualPlano').then((val) => {
        console.log(val)  
      })
      this.storage.get('QualFoto').then((val) => {
        
        this.FotoUserQual = val;
      })
    }
    menu(){ 
      //console.log('MENUUUU')
    }
    
  }
