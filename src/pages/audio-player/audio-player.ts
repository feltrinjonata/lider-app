import { Component, ViewChild, AfterViewInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { AudioServiceProvider } from '../../providers/audio-service/audio-service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'page-audio-player',
  templateUrl: 'audio-player.html',
})
export class AudioPlayerPage implements AfterViewInit  {
  @ViewChild('audioPlayer') audioPlayer: any;

  
  /**
   *
   */
  constructor(public audioService: AudioServiceProvider) {
    
  }

  ngAfterViewInit() {    
    this.audioService.audioPlayer = this.audioPlayer;
  }

  durationChangeEventHandler() { 
    this.audioService.totalMedia = this.audioPlayer.nativeElement.duration;
    this.audioService.emitTotalMedia(Math.round(this.audioService.totalMedia));
    //console.log('durationChangeEventHandler', this.audioService.totalMedia);
  }

  getAudio(){
    return this.audioService.audio;
  }


}

