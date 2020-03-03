import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MinhaListaPage } from '../minha-lista/minha-lista';
import { MinhaListaPublicacoesPage } from '../minha-lista-publicacoes/minha-lista-publicacoes';

@Component({
  selector: 'page-editar-minha-lista-publicacoes',
  templateUrl: 'editar-minha-lista-publicacoes.html',
})
export class EditarMinhaListaPublicacoesPage {
  
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
    this.storage.get('MinhaListaLivros').then((val) => {
      this.minhaLista = val;
    });
  }

  apagar_publicacao(item) {
    var index = this.minhaLista.findIndex(function (it, i) {
      return it.idlivro === item['idlivro']
    })
    this.minhaLista.splice(index, 1);
    this.storage.set('MinhaListaLivros', this.minhaLista)

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
    this.navCtrl.push(MinhaListaPublicacoesPage);    
    //this.navCtrl.push(MinhaListaPublicacoesPage)
  }

}
