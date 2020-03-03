import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MinhaListaPage } from '../minha-lista/minha-lista';
import { MinhaListaConcertoPage } from '../minha-lista-concerto/minha-lista-concerto';

@Component({
  selector: 'page-editar-minha-concerto',
  templateUrl: 'editar-minha-concerto.html',
})
export class EditarMinhaConcertoPage {
  
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
    this.storage.get('MinhaListaConcerto').then((val) => {
      this.minhaLista = val;
    });
  }

  apagar_publicacao(item) {
    var index = this.minhaLista.findIndex(function (it, i) {
      return it.idconcerto === item['idconcerto']
    })
    this.minhaLista.splice(index, 1);
    this.storage.set('MinhaListaConcerto', this.minhaLista)

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
    this.navCtrl.push(MinhaListaConcertoPage);  
  }

}
