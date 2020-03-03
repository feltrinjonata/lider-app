import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { DadosUsuarioProvider } from './../../providers/dados-usuario/dados-usuario';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-privacidade-ver',
  templateUrl: 'privacidade-ver.html',
})
export class PrivacidadeVerPage {

  data:any ={};
  item = [];

  constructor
  (
    public navCtrl: NavController, 
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl : ModalController
  ){

    this.getDados();
  }

  getDados(){

    this.item = this.navParams.get('item');

  }

  ionViewDidLoad() {

  }

}
