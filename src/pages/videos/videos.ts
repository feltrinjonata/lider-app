import { Component } from '@angular/core';
import { NavParams, NavController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { LoadingController } from 'ionic-angular';

import { LivrosPage } from './../livros/livros';
import { VerlivroPage } from '../verlivro/verlivro';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

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
import { AcabouTestePlanosPage } from '../acabou-teste-planos/acabou-teste-planos';
import { AcabouTestePlanosAndroidPage } from '../acabou-teste-planos-android/acabou-teste-planos-android';
import { VerPlPage } from '../ver-pl/ver-pl';
import { PlListaPage } from '../pl-lista/pl-lista';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {

   data:any ={};
   resolucao='';
   resolucaoNova='';

   item = [];
   urlVideo:any='';
   urlIMG:any='';
   pasta:any=[];
   padrao='';

   teste = [];   
   teste2 = []; 

   LegendaBR = '';

   QualLegenda:any='';
   icone : string = 'ico-mais-aulas';

   icoCurtir : string = 'Curtir';
   icoCurtirImg : string = '';

   relBooks = '';
   relVideos = '';
   relMaterias = '';

   Use_plano_geral : any = {}; 

   constructor(
    private socialSharing: SocialSharing, 
    public http: Http,
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams, 
    public service : DadosUsuarioProvider,
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController,     
    private storage: Storage
  ){

              this.data.baixa='link_240p';
              this.data.media='link_360p';
              this.data.boa='link_480p';
              this.data.excelente='link_720p';
              this.storage.get('resolucao').then((val) => {
                this.resolucao = val;
                this.getDados(this.resolucao);
              });
              this.getVincLivros();
              this.getVincPl();
              this.getVideosVinc();

    this.storage.ready().then(()=>{
        this.storage.get("ClassficarVideo").then( (data)=>{
          
          let nedo2=0;

          this.teste2 = data;
  
          if(data==null || data.length==0){
  
            //this.showEmptCartMessage= true;   
          
          }else{

            this.teste2.forEach( (item, index)=>{

              if(this.item['idvideo'] == item['idvideo']){
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

  ionViewWillEnter(){

    // --- VERIFICADOR DE PAGAMENTO ------------------------------------------------------------------------------------------ //
    /*
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

    // --- COMPARTILHAR --- // 
    //compilemsg(index):string{
      //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
      //return msg.concat(" \n sent from my awesome app");
    //}
    regularShare(msg, assunto, file, link){
      //var msg = this.compilemsg(msg);
      this.socialSharing.share(msg, assunto, file, link);
    }        

     api : string =  'http://app.progettoapp.com.br/arquivos/r';
     api2 : string =  'http://app.progettoapp.com.br/midias-lider/';

     getDados(resolucao){

      this.item = this.navParams.get('item');

      this.service.enviaContador('videos', this.item['idvideo']).subscribe(); 
      
      if(resolucao == 'link_240p'){
        this.resolucao = this.item['link_240p'];

      }else if(resolucao == 'link_360p'){
        this.resolucao = this.item['link_360p'];

      }else if(resolucao == 'link_480p'){
        this.resolucao = this.item['link_480p']; 

      }else if(resolucao == 'link_720p'){
        this.resolucao = this.item['link_720p'];  

      }else{
        this.resolucao = this.item['link_360p'];
      }
    
      this.urlVideo = this.api + '/' + this.item['Caminho'] + '/' + this.item['Pasta'] + '/' + this.resolucao;
      this.urlIMG = this.api + '/' + this.item['Caminho'] + '/' + this.item['Pasta'] + '/' +this.item['Img']+'_400.jpg';
      var imgFinal = this.api + '/' + this.item['Caminho'] + '/' + this.item['Pasta'] + '/' +this.item['Img']+'_400.jpg';
      //console.log(this.urlVideo); 

      this.LegendaBR = this.item['LegendaBR'];
      this.QualLegenda = this.api + '/' + this.item['Caminho'] + '/' + this.item['Pasta'] + '/' + this.LegendaBR;      
      //console.log(this.QualLegenda); 

      // ADD MINHA LISTA
      this.storage.ready().then(()=>{
        this.storage.get("MinhaListaAulas").then( (data)=>{
          
          let nedo=0;
          this.teste = data;
  
          if(data==null || data==false || data.length==0){
  
            //this.showEmptCartMessage= true;   
          
          }else{

            this.teste.forEach( (item, index)=>{

              if(this.item['idvideo'] == item['idvideo']){
                nedo=1;
              }

            })
            
          }

          if(nedo==1){
            this.icone = 'ico-correto-aulas';
          }else{
            this.icone = 'ico-mais-aulas';
          }

        })
      })       
       
      // ADD CURTIR
      this.storage.ready().then(()=>{
        this.storage.get("ClassficarAulas").then( (data)=>{
          
          let nedo2=0;

          this.teste2 = data;
  
          if(data==null || data.length==0){
  
            //this.showEmptCartMessage= true;   
          
          }else{

            this.teste2.forEach( (item, index)=>{

              if(this.item['idvideo'] == item['idvideo']){
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
    
    startVideo(item:string){ 
    
      this.storage.set('resolucao', item);

      if(item == 'link_240p'){
        this.resolucaoNova = this.item['link_240p'];

      }else if(item == 'link_360p'){
        this.resolucaoNova = this.item['link_360p'];

      }else if(item == 'link_480p'){
        this.resolucaoNova = this.item['link_480p']; 

      }else if(item == 'link_720p'){
        this.resolucaoNova = this.item['link_720p'];  

      }else{
        this.resolucaoNova = this.item['link_360p'];
      }

      this.urlVideo = this.api + '/' + this.item['Caminho'] + '/' + this.item['Pasta'] + '/' + this.resolucaoNova;
      console.log(this.urlVideo)
    } 

  getVincLivros() {

    this.item = this.navParams.get('item');

    this.storage.get('QualplanoSel').then((val) => {
      this.http.get(this.api2 + 'lista_livros_relacionados.php?p='+val+'&q='+this.item['idvideo']+'&est=video').map(res=>res.json()).subscribe(
        data=> this.relBooks = data.rows,
        err=> console.log(err),
      );
    }); 

  }
  getVincPl() {

    this.item = this.navParams.get('item');

    this.storage.get('QualplanoSel').then((val) => {
      this.http.get(this.api2 + 'lista_pl_relacionados.php?p='+val+'&q='+this.item['idvideo']+'&est=video').map(res=>res.json()).subscribe(
        data=> this.relMaterias = data.rows,
        err=> console.log(err),
      );
    }); 

  }
  getVideosVinc() {
     
    this.item = this.navParams.get('item');

    this.storage.get('QualplanoSel').then((val) => {
      this.http.get(this.api2 + 'lista_videos_relacionados.php?p='+val+'&q='+this.item['idvideo']+'&est=video').map(res=>res.json()).subscribe(
        data=> this.relVideos = data.rows,
        err=> console.log(err),
      );
    }); 

  }
  selecionaVinc(item: string){ this.navCtrl.push(LivrosPage, { item } ); }  
  selecionadoVideosVinc(item: string){ this.navCtrl.push(VideosPage, { item } ); }  
  selecionadoPlVinc(item: string){ this.navCtrl.push(PlListaPage, { item } ); }  

    AddMinhaLista(item){

      let added=0;

      this.storage.get("MinhaListaAulas").then((data)=>{
          
        if(data==null || data.length==0){
            
          data = [];
          /*
          this.toastCtrl.create({
            message: "Aula adicionada com sucesso!",
            duration: 2000,
            position: 'middle',
          }).present();*/
          
          data.push({
            "idvideo": item.idvideo,
            "Cat": item.Cat,            
            "Titulo": item.Titulo,
            "Subitulo": item.Subitulo,
            "Descricao": item.Descricao,
            "link_240p": item.link_240p,
            "link_360p": item.link_360p,
            "link_480p": item.link_480p,
            "link_720p": item.link_720p,
            "iconplay": item.iconplay,
            "Caminho": item.Caminho,
            "Pasta": item.Pasta,
            "Img": item.Img,
            "Data": item.Data,
            "Classificacao": item.Classificacao,
            "Tempo": item.Tempo,         
            "Ativo": item.Ativo
          });
  
          added=1;
  
        }else{
           
          for(let i=0 ; i<data.length ; i++){
  
            if(item.idvideo == data[i].idvideo){
              /*
              this.toastCtrl.create({
                message: "Aula removida com sucesso!",
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

          this.icone = 'ico-correto-aulas';

          data.push({
            "idvideo": item.idvideo,
            "Cat": item.Cat,  
            "Titulo": item.Titulo,
            "Subitulo": item.Subitulo,
            "Descricao": item.Descricao,
            "link_240p": item.link_240p,
            "link_360p": item.link_360p,
            "link_480p": item.link_480p,
            "link_720p": item.link_720p,
            "iconplay": item.iconplay,
            "Caminho": item.Caminho,
            "Pasta": item.Pasta,
            "Img": item.Img,
            "Data": item.Data,
            "Classificacao": item.Classificacao,
            "Tempo": item.Tempo,         
            "Ativo": item.Ativo
          });
          /*
          this.toastCtrl.create({
            message: "Aula adicionada com sucesso!",
            duration: 2000,
            position: 'middle',
          }).present();*/
  
        }
  
        if(added==1){ this.icone = 'ico-mais-aulas'; }
  
        this.storage.set("MinhaListaAulas", data).then( ()=>{} );
      
      });
    }

    ClassficarVideo(item){

      let added=0;
  
      this.storage.get("ClassficarAulas").then((data)=>{
                
        if(data==null || data.length==0){
            
          data = [];
          /*
          this.toastCtrl.create({
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
              /*
              this.toastCtrl.create({
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
          /*
          this.toastCtrl.create({
            message: "Você marcou o gostei nessa aula!",
            duration: 2000,
            position: 'middle',
          }).present(); */
       
        }
  
        if(added==1){

          this.icoCurtir = 'Curtir'; 
          this.icoCurtirImg = '';
  
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
  
          this.icoCurtir = 'Curtiu';  
          this.icoCurtirImg = '-s';
           
        }
  
        this.storage.set("ClassficarAulas", data).then( ()=>{} );
      
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

}
