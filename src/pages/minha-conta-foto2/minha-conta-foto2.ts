import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-minha-conta-foto2',
  templateUrl: 'minha-conta-foto2.html',
})
export class MinhaContaFoto2Page {

  myphoto: any;
  FotoUserQual: any = {};

  constructor
  (
    public navCtrl: NavController, public navParams: NavParams, private loadingCtrl:LoadingController,
    private camera: Camera, private transfer: FileTransfer, private file: File,
    public storage:Storage,
  ){

    this.userDadosGuardados();
    
  }

  userDadosGuardados(){
    this.storage.get('QualFoto').then((val) => {
      this.FotoUserQual = val;
    })

    this.myphoto = "";
  } 

}
