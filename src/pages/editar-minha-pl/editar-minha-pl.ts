import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MinhaListaPage } from '../minha-lista/minha-lista';
import { MinhaListaPlPage } from '../minha-lista-pl/minha-lista-pl';

@Component({
  selector: 'page-editar-minha-pl',
  templateUrl: 'editar-minha-pl.html',
})
export class EditarMinhaPlPage {
  
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
    this.storage.get('MinhaListaPl').then((val) => {
      this.minhaLista = val;
    });
  }

  apagar_publicacao(item) {
    var index = this.minhaLista.findIndex(function (it, i) {
      return it.idpl === item['idpl']
    })
    this.minhaLista.splice(index, 1);
    this.storage.set('MinhaListaPl', this.minhaLista)

    console.log(this.minhaLista)
  }

  showConfirm(item) {
    let confirm = this.alertCtrl.create({
      title: 'Alerta ...',
      message: 'Deseja realmente apagar esse Publicação?',
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
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  voltar(){
    //this.viewCtrl.dismiss();
    this.navCtrl.setRoot(MinhaListaPage);
    this.navCtrl.push(MinhaListaPlPage);     
  }

}
