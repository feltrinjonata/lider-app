import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Audios2Page } from '../audios2/audios2';
import { Storage } from '@ionic/storage';
import { EditarMinhaOntoartePage } from '../editar-minha-ontoarte/editar-minha-ontoarte';
import { MinhaListaOntoartePage } from '../minha-lista-ontoarte/minha-lista-ontoarte';
import { AudioServiceProvider } from '../../providers/audio-service/audio-service';
import { Observable } from 'rxjs/Observable';
import { EditarMinhaAudioOntoartePage } from '../editar-minha-audio-ontoarte/editar-minha-audio-ontoarte';
import { HomePage } from '../home/home';
import { MinhaListaPage } from '../minha-lista/minha-lista';
import { MinhaListaConcertoPage } from '../minha-lista-concerto/minha-lista-concerto';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { BuscaPage } from '../busca/busca';
import { DicionarioPage } from '../dicionario/dicionario';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-minha-lista-audio-ontoarte',
  templateUrl: 'minha-lista-audio-ontoarte.html',
})
export class MinhaListaAudioOntoartePage {
  relAudios = [];
  position = 0;
  oldPosition = 0;
  iconPlay = 'play';
  subscription;
  audioInfo: string = "--";
  artistaInfo: string = "--";
 
  api: string = 'http://app.progettoapp.com.br/arquivos/r/albuns/';
  api2: string = 'http://app.progettoapp.com.br/arquivos/r/albuns/';

  constructor
    (
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      private Storage: Storage,
      public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public audioService: AudioServiceProvider
    ) {

    this.audioService.changePositionObservable
    .subscribe(value => this.audioService.audioPlayer.nativeElement.currentTime = value);

    this.getDados();
    


  }

  getTotalMediaPlayer() {
    return this.audioService.totalMedia;
  }

  refreshPosition() {
    let delta = Math.abs(this.position - this.oldPosition);
    if (delta > 3) {
      this.audioService.changePosition(this.position);
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getIsExecuting(): boolean {
    return this.audioService.IsExecuting;
  }

  getFormatedCurrentDuration(): string {
    return this.readableDuration(this.position);
  }

  readableDuration(seconds) {
    let sec: any = Math.floor(seconds);
    let min: any = Math.floor(sec / 60);
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ':' + sec;
  }

  random() {
    this.audioService.indexMinhaListaAudio = this.getRandomInt(0, this.relAudios.length - 1);
    this.toogleIconPlayList();

    this.audioService.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.audioService.indexMinhaListaAudio].arquivo_audio;
    this.audioService.audioPlayer.nativeElement.src = this.audioService.audio;
    
    this.relAudios[this.audioService.indexMinhaListaAudio].iconplay = 'pause';
    this.audioPlay();
  }

  getDados() {
    this.Storage.ready().then(() => {
      this.Storage.get("MinhaListaAudios").then((data) => {
        this.relAudios = data;
        this.loadExecutingAudio();
        //console.log('Lista em Session Audios Root', data);
      })
    })

  }

  abriMinhaLista(item: string) {
    this.navCtrl.push(Audios2Page, { item });
  }

  AbrirEditarOntoarte(){
    this.navCtrl.push(EditarMinhaAudioOntoartePage);
  }

  abrirMinhaListaHome(){
    this.navCtrl.setRoot(MinhaListaPage); 
  }
  abrirMinhaListaAlbuns() {
    this.navCtrl.push(MinhaListaOntoartePage);
  }
  abrirMinhaListaAudio(){
    this.navCtrl.push(MinhaListaAudioOntoartePage); 
  }
  abrirMinhaListaConcertos(){
    this.navCtrl.push(MinhaListaConcertoPage); 
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

  toogleIconPlayList() {
    for (let i = 0; i < this.relAudios.length; i++) {
      const element = this.relAudios[i];
      element.iconplay = 'play';
    }
  }

  loadExecutingAudio() {
    this.toogleIconPlayList();
    if (this.audioService.isExecuting()) {      
      
      this.relAudios[this.audioService.indexMinhaListaAudio].iconplay = 'pause';
      this.iconPlay = "pause";
      this.audioInfo = this.relAudios[this.audioService.indexMinhaListaAudio].audio;
      this.artistaInfo = this.relAudios[this.audioService.indexMinhaListaAudio].artista;
    }
  }

  unsubscribePlayer() {
    this.subscription.unsubscribe();
  }


  startAudio(item, index) {
    //Verifica se o audio atual está executando a para a execução
    if (this.audioService.isExecuting() && this.audioService.isExecutingIndexMyList(index)) {
      item.iconplay = 'play';
      this.iconPlay = 'play'
      this.unsubscribePlayer();
      this.audioService.audioPlayer.nativeElement.pause();
      this.audioService.totalMedia = 0;
      this.audioInfo = "--";
      this.artistaInfo = "--";
      this.audioService.IsExecuting = false;
      return;
    }

    console.log('Musica Selecionada', item);
    this.toogleIconPlayList();
    this.audioService.indexMinhaListaAudio = index;
    this.audioInfo = item.audio;
    this.artistaInfo = item.artista;
    this.audioService.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.audioService.indexMinhaListaAudio].arquivo_audio;
    this.audioService.audioPlayer.nativeElement.src = this.audioService.audio;
    this.audioService.audioPlayer.nativeElement.load();

    item.iconplay = 'pause';
    this.iconPlay = 'pause';
    this.audioPlay();
  }

  audioPlay() {

    this.audioService.audioPlayer.nativeElement.play();
    this.startCronometro();
    this.audioService.IsExecuting = true;
    //console.log('play');
  }

  startCronometro() {
    this.subscription = Observable.interval(1000).subscribe(x => {

      this.oldPosition = this.audioService.audioPlayer.nativeElement.currentTime;
      this.position = this.audioService.audioPlayer.nativeElement.currentTime;

      console.log(this.position);

      this.audioService.emitPosition(this.position);
      if (this.audioService.totalMedia > 0) {
        if (this.position >= this.audioService.totalMedia) {
          this.executeNextAudio();
        }
      }
    });
  }

  executeNextAudio() {
    this.unsubscribePlayer();

    setTimeout(() => {

      
      this.relAudios[this.audioService.indexMinhaListaAudio].iconplay = 'play';
      this.audioService.indexMinhaListaAudio++

      if (this.audioService.indexMinhaListaAudio > (this.relAudios.length - 1)) {
        this.audioService.indexMinhaListaAudio = 0;
      }

      
      this.relAudios[this.audioService.indexMinhaListaAudio].iconplay = 'pause';
      this.audioService.audioPlayer.nativeElement.pause();
      this.audioService.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.audioService.indexMinhaListaAudio].arquivo_audio;
      this.audioService.audioPlayer.nativeElement.src = this.audioService.audio;

      this.audioPlay();
    }, 200);
  }

  next() {
    this.audioService.indexMinhaListaAudio++;

    if (this.audioService.indexMinhaListaAudio > this.relAudios.length - 1) {
      this.audioService.indexMinhaListaAudio = 0;
    }

    this.toogleIconPlayList();

    
    this.relAudios[this.audioService.indexMinhaListaAudio].iconplay = 'pause';
    this.audioService.audioPlayer.nativeElement.pause();
    this.audioService.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.audioService.indexMinhaListaAudio].arquivo_audio;
    this.audioService.audioPlayer.nativeElement.src = this.audioService.audio;  
    this.audioInfo = this.relAudios[this.audioService.indexMinhaListaAudio].audio;
    this.artistaInfo = this.relAudios[this.audioService.indexMinhaListaAudio].artista; 
    this.audioPlay();

  }

  back() {
    this.audioService.indexMinhaListaAudio--;

    if (this.audioService.indexMinhaListaAudio < 0) {
      this.audioService.indexMinhaListaAudio = this.relAudios.length - 1;
    }

    this.toogleIconPlayList();

    this.audioService.audio = 'http://app.progettoapp.com.br/arquivos/r/albuns/' + this.relAudios[this.audioService.indexMinhaListaAudio].arquivo_audio;
    this.audioService.audioPlayer.nativeElement.src = this.audioService.audio;

    
    this.relAudios[this.audioService.indexMinhaListaAudio].iconplay = 'pause';
    this.audioInfo = this.relAudios[this.audioService.indexMinhaListaAudio].audio;
    this.artistaInfo = this.relAudios[this.audioService.indexMinhaListaAudio].artista; 
    this.audioPlay();
  }

}