import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';
import { VideosPage } from '../videos/videos';
import { PlListaPage } from '../pl-lista/pl-lista';
import { Audios2Page } from '../audios2/audios2';
import { LivrosPage } from '../livros/livros';

import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { OntoarteVerPage } from './../ontoarte-ver/ontoarte-ver';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { EventosVerPage } from '../eventos-ver/eventos-ver';
import { EventosAntigosVerPage } from '../eventos-antigos-ver/eventos-antigos-ver';
import { DicionarioVerPage } from '../dicionario-ver/dicionario-ver';
import { AssinarDegustacaoPage } from '../assinar-degustacao/assinar-degustacao';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';
import { AcabouTestePlanosPage } from '../acabou-teste-planos/acabou-teste-planos';
import { AcabouTestePlanosAndroidPage } from '../acabou-teste-planos-android/acabou-teste-planos-android';

@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {

  public technologies : Array<any>;
  
  relnovidades = ''; 
  qtdePublicacoes: any;
  numerosNovidades: any;
  numerosNovidadesAtual: any; 
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl : ViewController,
    public service : DadosUsuarioProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,     
    public storage: Storage
  ) { 

    this.declareTechnologies(); 
 
   }

   ionViewDidLoad()
   {
    
   }
   
   declareTechnologies() : void{
      //retorno de Dados
      this.service.getBuscar()
      .subscribe(
          data=> this.technologies = data.rows,
          err=> console.log(err)
      );
  }

   filterTechnologies(param : any){
      
    let val : string 	= param;
    
    //console.log('busca', val);
    //if( (val.trim() !== '')||(val.trim() !== null) )
    //if(val.trim() !== '')
    if(val !== ''){
      this.technologies = this.technologies.filter((item) => {
        return item.Titulobusca.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Titulobusca2.toLowerCase().indexOf(val.toLowerCase()) > -1 
        || item.Categoria.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Categoria2.toLowerCase().indexOf(val.toLowerCase()) > -1 
        || item.Descricaobusca3.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Descricaobusca2.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Descricaobusca.toLowerCase().indexOf(val.toLowerCase()) > -1
        || item.Tags.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }else{
      let val : string 	= '0';
      this.declareTechnologies();
    }
   }

   selecionarBusca(item: string){

		if(item['Tipo'] == 'video'){

      this.navCtrl.push(VideosPage, { item });
      
    }else if(item['Tipo'] == 'videos'){

      this.navCtrl.push(VideosPage, { item });      

		}else if(item['Tipo'] == 'pl'){

			this.navCtrl.push(PlListaPage, { item });

		}else if(item['Tipo'] == 'musica'){

			this.navCtrl.push(Audios2Page, { item });

		}else if(item['Tipo'] == 'dicionario'){

			this.navCtrl.push(DicionarioVerPage, { item });

		}else if(item['Tipo'] == 'eventos-antigos'){

			this.navCtrl.push(EventosAntigosVerPage, { item });

		}else if(item['Tipo'] == 'eventos'){

			this.navCtrl.push(EventosVerPage, { item });

		}else{

			this.navCtrl.push(LivrosPage, { item });

		}

	}

  ionViewWillEnter() {
    /*
    // --- VERIFICADOR DE PAGAMENTO ------------------------------------------------------------------------------------------ //
    this.service.getVerificador().subscribe(
      data => {
        if(data.rows[0].Verificador == '0'){
        
          //verifica a salva da data salva no storage
          this.storage.get('dataMsg').then((val) => {
          
            // sendo diferente mostra a msg e salva a nova daya  
            if(data.rows[0].dataMsg != val || data.rows[0].tipoMsg == '1'){

              //mostra a mesagem
              let alert = this.alertCtrl.create({
                enableBackdropDismiss: false,
                title: 'Aviso!',
                subTitle: data.rows[0].VerMsg,
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => { 
                      
                      // se passou os 7 dias e nao tem mais acesso
                      if(data.rows[0].tipoMsg == '1'){

                        setTimeout(() => {
                          // androi_dVerificador - tem que buscar e mudar isso em todas as telas
                          //this.navCtrl.push(AcabouTestePlanosAndroidPage);
                          // ios -  - tem que buscar e mudar isso em todas as telas
                          this.navCtrl.push(AcabouTestePlanosPage);
                        }, 500);
                        
                      }else{
                                  
                        //salva no banco de dados
                        this.storage.set('dataMsg', data.rows[0].dataMsg);      

                      }

                    }
                  }
                ]
              }); 
              alert.present();         

            }

          })  
                 
        }
      },
      err => console.log(err)  
    );
    */
    // --- FIM DO VERIFICADOR DE PAGAMENTO ------------------------------------------------------------------------------------------ //

    this.service.getNovidades().subscribe(
      data => {
        this.relnovidades = data.rows;        
        this.storage.get('relNovidades').then((val) => {
          if(val != null ){
            this.numerosNovidades = val.length;
          }else{
            this.storage.set('relNovidades', this.relnovidades)
          }
        });
        this.storage.get('numeroPublicacoes').then((val) => {
          if(val != null){
            this.numerosNovidadesAtual = val;
          }else{
            this.storage.set('numeroPublicacoes', this.relnovidades.length)
          }
        });
        setTimeout(() => {

          if(this.relnovidades.length > this.numerosNovidadesAtual){
            this.qtdePublicacoes = this.relnovidades.length - this.numerosNovidadesAtual;
          }
        }, 500);

      },
      err => console.log(err)
    );
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
  abrirPaginaBuscaGeral(){
    this.navCtrl.setRoot(BuscaPage);
  }  

}