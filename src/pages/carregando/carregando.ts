import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-carregando',
  templateUrl: 'carregando.html',
})
export class CarregandoPage {

  Qual_iduser : any = {}; 
  Qual_transactionId : any = {};
  link : any = {}; 

  constructor(
    public navCtrl: NavController, 
    private http: Http, 
    public storage: Storage,         
    public navParams: NavParams
  ){


    window.location.reload(); 
    setTimeout(() => {
      this.navCtrl.setRoot(TimelinePage);
      
    }, 500);

  }

  ionViewWillEnter(){


  }

}
