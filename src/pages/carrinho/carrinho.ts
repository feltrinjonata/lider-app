import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BuscaPage } from '../busca/busca';
import { EventosPage } from '../eventos/eventos';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { OntoartePage } from '../ontoarte/ontoarte';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { TitulosPage } from '../titulos/titulos';
import { HomePage } from '../home/home';
import { LojaPage } from '../loja/loja';
import { LojaRevistaPage } from '../loja-revista/loja-revista';
import { LojaSouvenirsPage } from '../loja-souvenirs/loja-souvenirs';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  data:any ={};
  total: any;
  totalNedo: any;

  item = []; 

  ListaItens = [];

  MinhaListaItens: any[] = [];

  constructor(
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController
  ) {

    this.total = 0.0;
    this.totalNedo = 0.0;
    //this.getDados();  

    this.storage.ready().then(()=>{
      this.storage.get("ComprasCarrinho").then( (data)=>{

        this.MinhaListaItens = data;
        //console.log(this.MinhaListaItens);

        if(this.MinhaListaItens.length > 0){

          this.MinhaListaItens.forEach( (item, index)=> {
            if(item.idqual != 0){
              this.total = this.total + (item.Valor * item.qty);
            }
          })
          this.total = parseFloat(this.total).toFixed(2);
        }

      })
    })

  }
  api : string =  'http://app.progettoapp.com.br/arquivos/r';

  removeFromCart(item, i){

    let price;
    price = item.Valor
    let qty = item.qty;

    this.MinhaListaItens.splice(i, 1);

    this.storage.set("ComprasCarrinho", this.MinhaListaItens).then( ()=> {

      //this.total = this.total - (price * qty);
      this.total = parseFloat(this.total.toString()) - ((parseFloat(price.toString()) * qty));
      //console.log('remove', this.total);
    });

    if(this.total < 0){
      this.total = 0.0;
    }

    if(this.MinhaListaItens.length == 0){
      //this.showEmptyCartMessage = true;
    }


  }

  checkout(){

    this.storage.get("userLoginInfo").then( (data) => {
      if(data != null){
        this.navCtrl.push('Checkout');
      } else {
        this.navCtrl.push('Login', {next: 'Checkout'})
      }
    })

  }

  changeQty(item, i, change){

    let price;
    
    price = parseFloat(item.Valor);
    
    let qty = item.qty;

    if(change < 0 && item.qty == 1){
      return;
    }
    if(change == 1){
      qty++;
    }else{
      qty--;
    }
    item.qty = qty;
    item.amount = qty * price;

    this.MinhaListaItens[i] = item;

    this.MinhaListaItens[i] = item;

    this.storage.set("ComprasCarrinho", this.MinhaListaItens).then( ()=> {

    });

    this.total = (parseFloat(this.total.toString()) + (parseFloat(price.toString()) * change));
    this.total = parseFloat(this.total).toFixed(2);

  }

  ionViewDidLoad() {

  }

  /*getDados() {
  
    this.storage.ready().then(()=>{

      this.storage.get("ComprasCarrinho").then( (data)=>{

        this.MinhaListaItens = data;

        if(data==null || data.lengt==0){

        }else{

          this.MinhaListaItens.forEach( (item, index)=>{
            this.ListaItens = item;
          })
          
        }

      })
    })

  }*/

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage);
  }

  abrirLojaLivro(){
    this.navCtrl.setRoot(LojaPage);
  }
  abrirLojaRevista(){
    this.navCtrl.setRoot(LojaRevistaPage);
  }
  abrirLojaSouvenirs(){
    this.navCtrl.setRoot(LojaSouvenirsPage);
  }
  abrirCarrinho(){
    this.navCtrl.push(CarrinhoPage);
  }  

}
