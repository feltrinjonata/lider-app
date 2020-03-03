import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AudioServiceProvider {

  public audioPlayer: any;
  public audio = null;
  public totalMedia = 0;
  public positionObservable = new Subject<number>();
  public changePositionObservable = new Subject<number>();
  public totalMediaObservable = new Subject<number>();
  public playObservable = new Subject<boolean>();
  public IsExecuting: boolean = false;
  public indexAudio = 0;
  public indexMinhaListaAudio = 0;

  constructor() {
    console.log('Hello AudioServiceProvider Provider');
  }

  emitPosition(val) {
    this.positionObservable.next(val);
  }

  changePosition(val) {
    this.changePositionObservable.next(val);
  }
  emitTotalMedia(val) {
    this.totalMediaObservable.next(val);
  }
  emitPlay(val) {
    this.playObservable.next(val);
  }

  isExecuting(): boolean {
    return this.IsExecuting;
  }

  isExecutingIndex(index: number) : boolean {
    return index == this.indexAudio;
  }

  isExecutingIndexMyList(index: number) : boolean {
    return index == this.indexMinhaListaAudio;
  }


}
