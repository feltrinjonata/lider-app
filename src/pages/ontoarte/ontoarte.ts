import { Component } from '@angular/core'; 
import { NavParams, NavController, Platform, LoadingController, AlertController } from 'ionic-angular'; 
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { AudioServiceProvider } from './../../providers/audio-service/audio-service';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { AudiosPage } from '../audios/audios';
import { Audios2Page } from '../audios2/audios2';
import { VideosPage } from '../videos/videos';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { OntoarteVerPage } from './../ontoarte-ver/ontoarte-ver';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { ConcertoVideoPage } from '../concerto-video/concerto-video';
import { AudioBookVerPage } from '../audio-book-ver/audio-book-ver';
import { AssinarDegustacaoPage } from '../assinar-degustacao/assinar-degustacao';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';
import { AcabouTestePlanosPage } from '../acabou-teste-planos/acabou-teste-planos';
import { AcabouTestePlanosAndroidPage } from '../acabou-teste-planos-android/acabou-teste-planos-android';

@Component({
  selector: 'page-ontoarte',
  templateUrl: 'ontoarte.html',
})
export class OntoartePage {
  
  @ViewChild('productSlides') productSlides: Slides;

  data:any ={};
  relAlbuns = '';
  relConcerto = '';
  relAudiobooks = '';

  relnovidades = ''; 
	qtdePublicacoes: any;
	numerosNovidades: any;
	numerosNovidadesAtual: any;

  constructor(
    public navCtrl: NavController, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController, 
    public storage: Storage,
    private alertCtrl: AlertController,       
    public audioService: AudioServiceProvider
  ){

    this.getDados();
    this.getDados2();
    this.getDadosAudiosBooks();
 
  }

  ionViewDidLoad() {
    
    setInterval(()=> {
    
        if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);
        this.productSlides.slideNext();
        
    },3000)

  }
  
  api : string =  'http://app.progettoapp.com.br/arquivos/r';
  
  ionViewWillEnter() {

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
					}
				});
				setTimeout(() => {

					if(this.relnovidades.length > this.numerosNovidadesAtual){
						this.qtdePublicacoes = this.relnovidades.length - this.numerosNovidadesAtual;
					}
				}, 500);

			},
			err => console.log(err)
		);
	}

  getDados() {
    this.service.getAlbuns() 
    .subscribe(
      data=> this.relAlbuns = data.rows,
      err=> console.log(err)
    );
  }
  selecionado(item: string) { 
    this.navCtrl.push(Audios2Page, { item });
  }

  getDadosAudiosBooks() {
    this.service.getAlbunsBooks()
    .subscribe(
      data=> this.relAudiobooks = data.rows,
      err=> console.log(err)
    );
  }
  selecionadoAudiosBooks(item: string) { 
    this.navCtrl.push(AudioBookVerPage, { item });
  }

  getDados2() {
    this.service.getConcerto()
    .subscribe(
      data=> this.relConcerto = data.rows,
      err=> console.log(err)
    );
  }
  selecionadoConcerto(item: string) {    
    this.navCtrl.push(ConcertoVideoPage, { item });
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
