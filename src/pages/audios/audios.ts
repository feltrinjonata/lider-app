import { AudioServiceProvider } from './../../providers/audio-service/audio-service';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario'
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-audios',
  templateUrl: 'audios.html',
})
export class AudiosPage {
  @ViewChild('audioPlayer') audioPlayer: any;

  item = [];
  relAudios = '';
  position = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public audioService: AudioServiceProvider
  ) {

    this.audioService.changePositionObservable.subscribe(
      value => {

      }
    )

    this.getAudios();
    this.getDados();
  }
  
  
  api = "http://www.adautobulhoes.com.br/vinhetas-gratis/";
  audio:any="";
  color = 'primary';

  getAudios() {
     //retorno de Dados
    this.service.getAudios()
    .subscribe(
        data=> this.relAudios = data.rows,
        err=> console.log(err)
    );
  }

  getDados(){
    this.audio = this.navParams.get('musica');
  }
  
  startAudio(item: string) {
    this.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + item['arquivo_audio'];   
    this.audioPlayer.nativeElement.src = this.audio;
    this.audioPlayer.nativeElement.load();

    /*
    var musica = this.audio  

    let loader = this.loadingCtrl.create({
      content: "Carregando",
      duration: 300
    });
    loader.present();      
      this.navCtrl.setRoot(AudiosPage,{
        musica
      });
      */
  }

  favorito(item){
    this.color ="secondarys";
    console.log('FAVORITO', item)
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

