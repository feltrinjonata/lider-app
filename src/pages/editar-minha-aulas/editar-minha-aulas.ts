import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MinhaListaPage } from '../minha-lista/minha-lista';
import { MinhaListaAulasPage } from '../minha-lista-aulas/minha-lista-aulas';

@Component({
  selector: 'page-editar-minha-aulas',
  templateUrl: 'editar-minha-aulas.html',
})
export class EditarMinhaAulasPage {
  
  minhaLista: any = [];

  constructor
  (
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public alertCtrl: AlertController,
    public viewCtrl : ViewController
  ){
    
  }

  ionViewDidLoad() {
    this.storage.get('MinhaListaAulas').then((val) => {
      this.minhaLista = val;
    });
  }

  apagar_publicacao(item) {
    var index = this.minhaLista.findIndex(function (it, i) {
      return it.idvideo === item['idvideo']
    })
    this.minhaLista.splice(index, 1);
    this.storage.set('MinhaListaAulas', this.minhaLista)

    //console.log(this.minhaLista)
  }

  showConfirm(item) {
    let confirm = this.alertCtrl.create({
      title: 'Alerta ...',
      message: 'Deseja realmente remover?',
      buttons: [
        {
          text: 'SIM',
          handler: () => {
            this.apagar_publicacao(item);          
          }
        },
        {
          text: 'Não',
          handler: () => {
            //console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  voltar(){
    //this.viewCtrl.dismiss();
    this.navCtrl.setRoot(MinhaListaPage);
    this.navCtrl.push(MinhaListaAulasPage);   
  }

}
