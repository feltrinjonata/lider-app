import { LojaPage } from './../loja/loja';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { CarrinhoPage } from '../carrinho/carrinho';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-loja-modal',
  templateUrl: 'loja-modal.html',
})
export class LojaModalPage {

  data:any ={};
  item = [];
  qual = [];

  teste = [];   
  teste2 = []; 

  qtCarrinho:any;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private Storage: Storage,
    private toastCtrl: ToastController
  ){

    this.getDados();

    //qt carrinho
    this.Storage.ready().then(()=>{
      this.Storage.get("ComprasCarrinho").then( (data)=>{

        this.qtCarrinho = data.length-1;

      })
    })

  }

  api : string =  'http://app.progettoapp.com.br/arquivos/r';

  getDados(){

    this.item = this.navParams.get('item');

  }
  
  Comprar(item, qual){

    let added=0;

    this.Storage.get("ComprasCarrinho").then((data)=>{
              
      if(data==null || data.length==0){
          
        data = [];
        
        if(item.Caminho == 'livros'){

          data.push({
            "idqual": item.idlivro,
            "qual": qual,          
            "idlivro": item.idlivro,
            "Cat": item.Cat,
            "Arquivo": item.Arquivo,
            "arquivoCompleto": item.arquivoCompleto,
            "Data": item.Data,
            "Titulo": item.Titulo,
            "Subitulo": item.Subitulo,
            "Descricao": item.Descricao,
            "Caminho": item.Caminho,
            "Pasta": item.Pasta,
            "Img": item.Img,
            "paginas": item.paginas,
            "Valor": item.Valor,
            "Desconto": item.Desconto,          
            "Ativo": item.Ativo
          });

        }else if(item.Caminho == 'pl'){

          data.push({
            "idqual": item.idpl,
            "qual": qual,          
            "idpl": item.idpl,
            "Cat": item.Cat,
            "Arquivo": item.Arquivo,
            "arquivoCompleto": item.arquivoCompleto,
            "Data": item.Data,
            "Titulo": item.Titulo,
            "Subitulo": item.Subitulo,
            "Descricao": item.Descricao,
            "Caminho": item.Caminho,
            "Pasta": item.Pasta,
            "Img": item.Img,
            "paginas": item.paginas,
            "Valor": item.Valor,
            "Desconto": item.Desconto,          
            "Ativo": item.Ativo
          });

        }else if(item.Caminho == 'videos'){

          data.push({
            "idqual": item.idvideo,
            "qual": qual,          
            "idvideo": item.idvideo,
            "Cat": item.Cat,            
            "Titulo": item.Titulo,
            "Subitulo": item.Subitulo,
            "Descricao": item.Descricao,
            "link_240p": item.link_240p,
            "link_360p": item.link_360p,
            "link_480p": item.link_480p,
            "link_720p": item.link_720p,
            "iconplay": item.iconplay,
            "Caminho": item.Caminho,
            "Pasta": item.Pasta,
            "Img": item.Img,
            "Data": item.Data,
            "Classificacao": item.Classificacao,
            "Tempo": item.Tempo,         
            "Ativo": item.Ativo
          });

        }else if(item.Caminho == 'albuns'){

          data.push({
            "idqual": item.idalbum,
            "qual": qual,          
            "idalbum": item.idalbum,
            "Titulo": item.Titulo,
            "Subitulo": item.Subitulo,
            "Descricao": item.Descricao,
            "Pasta": item.Pasta,
            "Img": item.Img,
            "Caminho": item.Caminho,
            "Valor": item.Valor,          
            "Desconto": item.Desconto,
            "Ativo": item.Ativo  
          });

        }

        added=1;

      }else{
         
        for(let i=0 ; i<data.length ; i++){

          if(item.Caminho == 'livros'){

            if(item.idlivro == data[i].idlivro){

              const query = data.find(item => item.idlivro === data[i].idlivro);
  
              const toremove = data.indexOf(query);
  
              data.splice(toremove,1);
  
              added=1;
  
            }  

          }else if(item.Caminho == 'pl'){
  
            if(item.idpl == data[i].idpl){

              const query = data.find(item => item.idpl === data[i].idpl);
  
              const toremove = data.indexOf(query);
  
              data.splice(toremove,1);
  
              added=1;
  
            }  
  
          }else if(item.Caminho == 'videos'){
  
            if(item.idvideo == data[i].idvideo){

              const query = data.find(item => item.idvideo === data[i].idvideo);
  
              const toremove = data.indexOf(query);
  
              data.splice(toremove,1);
  
              added=1;
  
            }  
  
          }else if(item.Caminho == 'albuns'){
  
            if(item.idalbum == data[i].idalbum){

              const query = data.find(item => item.idalbum === data[i].idalbum);
  
              const toremove = data.indexOf(query);
  
              data.splice(toremove,1);
  
              added=1;
  
            }  
  
          }

        }

      }
    
     if(added==0){

      if(item.Caminho == 'livros'){

        data.push({
          "idqual": item.idlivro,
          "qual": qual,          
          "idlivro": item.idlivro,
          "Cat": item.Cat,
          "Arquivo": item.Arquivo,
          "arquivoCompleto": item.arquivoCompleto,
          "Data": item.Data,
          "Titulo": item.Titulo,
          "Subitulo": item.Subitulo,
          "Descricao": item.Descricao,
          "Caminho": item.Caminho,
          "Pasta": item.Pasta,
          "Img": item.Img,
          "paginas": item.paginas,
          "qty": item.qty,
          "Valor": item.Valor,
          "Desconto": item.Desconto,          
          "Ativo": item.Ativo
        });

        this.toastCtrl.create({
          message: "Publicação adicionado no seu carrinho!",
          duration: 2000,
          position: 'middle',
        }).present();

        this.navCtrl.push(CarrinhoPage);

      }else if(item.Caminho == 'pl'){

        data.push({
          "idqual": item.idpl,
          "qual": qual,          
          "idpl": item.idpl,
          "Cat": item.Cat,
          "Arquivo": item.Arquivo,
          "arquivoCompleto": item.arquivoCompleto,
          "Data": item.Data,
          "Titulo": item.Titulo,
          "Subitulo": item.Subitulo,
          "Descricao": item.Descricao,
          "Caminho": item.Caminho,
          "Pasta": item.Pasta,
          "Img": item.Img,
          "paginas": item.paginas,
          "qty": item.qty,
          "Valor": item.Valor,
          "Desconto": item.Desconto,          
          "Ativo": item.Ativo
        });

        this.toastCtrl.create({
          message: "Revista adicionada no seu carrinho!",
          duration: 2000,
          position: 'middle',
        }).present();

      }else if(item.Caminho == 'videos'){

        data.push({
          "idqual": item.idvideo,
          "qual": qual,          
          "idvideo": item.idvideo,
          "Cat": item.Cat,            
          "Titulo": item.Titulo,
          "Subitulo": item.Subitulo,
          "Descricao": item.Descricao,
          "link_240p": item.link_240p,
          "link_360p": item.link_360p,
          "link_480p": item.link_480p,
          "link_720p": item.link_720p,
          "iconplay": item.iconplay,
          "Caminho": item.Caminho,
          "Pasta": item.Pasta,
          "Img": item.Img,
          "Data": item.Data,
          "Classificacao": item.Classificacao,
          "Tempo": item.Tempo,         
          "Ativo": item.Ativo
        });

        this.toastCtrl.create({
          message: "Aula adicionada no seu carrinho!",
          duration: 2000,
          position: 'middle',
        }).present();

      }else if(item.Caminho == 'albuns'){

        data.push({
          "idqual": item.idalbum,
          "qual": qual,          
          "idalbum": item.idalbum,
          "Titulo": item.Titulo,
          "Subitulo": item.Subitulo,
          "Descricao": item.Descricao,
          "Pasta": item.Pasta,
          "Img": item.Img,
          "Caminho": item.Caminho,
          "qty": item.qty,          
          "Valor": item.Valor,          
          "Desconto": item.Desconto,
          "Ativo": item.Ativo  
        });

        this.toastCtrl.create({
          message: "CD/DVD adicionado no seu carrinho!",
          duration: 2000,
          position: 'middle',
        }).present();

      }

    }

    this.Storage.set("ComprasCarrinho", data).then( ()=>{} );
    
    });
  }

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage);
  }

  abrirCarrinho(){
    this.navCtrl.push(CarrinhoPage);
  }  

}
