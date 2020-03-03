import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AudioServiceProvider } from './../../providers/audio-service/audio-service';
import { Component, ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario'
import { Observable } from 'rxjs/Rx';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-ontoarte-ver',
  templateUrl: 'ontoarte-ver.html',
})
export class OntoarteVerPage {
  @ViewChild('audioPlayer') audioPlayer: any;

  subscription; 
  data:any ={};
  item = [];
  relAudios : any;
  position = 0;
  oldPosition = 0;
  totalMedia = 0;
  iconPlay = 'play';
  play = false
  audio = null;
  indexAudio = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public audioService: AudioServiceProvider
  ) {

    this.audioService.changePositionObservable.subscribe(
      value => {
        this.audioPlayer.nativeElement.currentTime = value;
      }
    )

    this.getAudios();
  }
  
  getAudios(){

    this.item = this.navParams.get('item');
    
  }
  durationChangeEventHandler() { 
    this.totalMedia = this.audioPlayer.nativeElement.duration;
    this.audioService.emitTotalMedia(Math.round(this.totalMedia));
    console.log(this.totalMedia);    
  }

  startCronometro(){    
    this.subscription = Observable.interval(1000).subscribe(x => {      

      this.oldPosition = this.audioPlayer.nativeElement.currentTime;
      this.position = this.audioPlayer.nativeElement.currentTime;

      console.log(this.position);
      
      this.audioService.emitPosition(this.position);
      if (this.position >= this.totalMedia) {
        
        console.log(this.position + ' - ' + this.totalMedia);
        this.stopCronometro();         
        
      }
    });    
  }

  stopCronometro() {
    this.subscription.unsubscribe();
    
    setTimeout(() => {
      this.relAudios[this.indexAudio].iconplay = 'play';
      this.indexAudio++
      
      if (this.indexAudio > this.relAudios.length -1) {
        this.indexAudio = 0;
      } 
      
      this.relAudios[this.indexAudio].iconplay = 'pause';

      this.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.indexAudio].arquivo_audio;   
      this.audioPlayer.nativeElement.src = this.audio;      
      this.audioPlay();      
    }, 200);
  }
  
  next() {
    this.indexAudio++;

    if (this.indexAudio > this.relAudios.length -1) {
      this.indexAudio = 0;
    } 
  
    this.toogleIconPlayList();
    
    this.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.indexAudio].arquivo_audio;   
    this.audioPlayer.nativeElement.src = this.audio;
    this.relAudios[this.indexAudio].iconplay = 'pause';
    this.audioPlay();

  }

  back() {
    this.indexAudio--;

    if (this.indexAudio < 0) {
      this.indexAudio = this.relAudios.length -1;
    } 
  
    this.toogleIconPlayList();

    this.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.indexAudio].arquivo_audio;   
    this.audioPlayer.nativeElement.src = this.audio;
    this.relAudios[this.indexAudio].iconplay = 'pause';
    this.audioPlay();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  random() {
    this.indexAudio = this.getRandomInt(0, this.relAudios.length -1);

    this.toogleIconPlayList();
    
    this.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.indexAudio].arquivo_audio;   
    this.audioPlayer.nativeElement.src = this.audio;
    this.relAudios[this.indexAudio].iconplay = 'pause';
    this.audioPlay();
  }


  audioPlay() {
    this.audioPlayer.nativeElement.play();
    this.startCronometro();
    this.play = true;    
    console.log('play');
  }
  
  audioPause() {
    console.log('pause');    
    this.audioPlayer.nativeElement.pause();
  }


  tooglePlay() {
  
    if (!this.audio) {
      if (this.relAudios.length > 0) {
        this.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[0].arquivo_audio;   
        this.audioPlayer.nativeElement.src = this.audio;
        //this.audioPlayer.nativeElement.load();
      }
    }

    console.log(this.audio);
    

    this.play = !this.play;
    this.audioService.emitPlay(this.play);

    if (this.play) {
      this.iconPlay = 'pause';
      this.relAudios[this.indexAudio].iconplay = 'pause';
    } else {
      this.iconPlay = 'play';
      this.relAudios[this.indexAudio].iconplay = 'play';
    }

    if (this.audioPlayer.nativeElement.paused) {
      this.audioPlay();
    } else {
      this.audioPause();
    }
  }
  
  refreshPosition() {
    
    let delta = Math.abs(this.position - this.oldPosition);

    if (delta > 3) {
      console.log('mudou');     
      this.audioService.changePosition(this.position);    
    }
    
  }

  toogleIconPlayList() {
    for (let i = 0; i < this.relAudios.length; i++) {
      const element = this.relAudios[i];
      element.iconplay = 'play';
    }
  }  


  startAudio(item, index) {
    this.toogleIconPlayList();
    item.iconplay = 'pause';
    this.indexAudio = index;

    this.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + item['arquivo_audio'];   
    this.audioPlayer.nativeElement.src = this.audio;
    this.audioPlayer.nativeElement.load();
    
    this.iconPlay = 'pause';
    this.audioPlay();
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
