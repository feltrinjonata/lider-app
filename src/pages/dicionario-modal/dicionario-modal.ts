import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { DicionarioVerPage } from '../dicionario-ver/dicionario-ver';
import { DicionarioModalVerPage } from '../dicionario-modal-ver/dicionario-modal-ver';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-dicionario-modal',
  templateUrl: 'dicionario-modal.html',
})
export class DicionarioModalPage {

   public technologies : Array<any>;
   constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl : ViewController,
    public service : DadosUsuarioProvider, 
    public loadingCtrl: LoadingController) { 

    this.declareTechnologies(); 

   }

   ionViewDidLoad()
   {
    
   }
   declareTechnologies() : void{
    //retorno de Dados
    this.service.getDicionario()
    .subscribe(
        data=> this.technologies = data.rows,
        err=> console.log(err)
    );
     //const browser = this.iab.create('https://ionicframework.com/');
}
  selecionado(item: string) { 
    let loader = this.loadingCtrl.create({
    content: "Carregando",
    duration: 1000
  });
  loader.present();      
    this.navCtrl.push(DicionarioModalVerPage, { item } );
  } 

  filterTechnologies(param : any)
  {
     
     let val : string 	= param;
     if (val.trim() !== '')
     {
        this.technologies = this.technologies.filter((item) =>
        {
          return item.palavra.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
     }else{
       let val : string 	= '0';
       this.declareTechnologies();
     }
  }

onFilter(category : string) : void
{
   this.declareTechnologies();

   // Only filter the technologies array IF the selection is NOT equal to value of all
   if (category.trim() !== 'all')
   {
      this.technologies = this.technologies.filter((item) =>
      {
        return item.tipo.toLowerCase().indexOf(category.toLowerCase()) > -1;
      })
   }
}

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  abrirPaginaHome(){
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaTitulos(){
    this.navCtrl.setRoot(TitulosPage);
  }
  abrirPaginaPublicacoes(){
    this.navCtrl.setRoot(TitulosLivrosPage);
  }
  abrirPaginaPl(){
    this.navCtrl.setRoot(RevistaPlPage);
  }
  abrirPaginaOntoarte(){
    this.navCtrl.setRoot(OntoartePage);
  }  
  abrirPaginaAovivo(){
    this.navCtrl.setRoot(AovivoVideosPage);
  } 
  abrirPaginaAreaUsuarioRestrita(){
    this.navCtrl.setRoot(AreaUsuarioRestritaPage);
  } 
  abrirPaginaEventos(){
    this.navCtrl.setRoot(EventosPage);
  }  
  abrirPaginaBusca(){
    this.navCtrl.setRoot(BuscaPage); 
  }

}