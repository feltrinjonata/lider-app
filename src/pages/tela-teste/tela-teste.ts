import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TitulosPage } from '../titulos/titulos';
import { TitulosLivrosPage } from '../titulos-livros/titulos-livros';
import { RevistaPlPage } from '../revista-pl/revista-pl';
import { OntoartePage } from '../ontoarte/ontoarte';
import { AreaUsuarioRestritaPage } from '../area-usuario-restrita/area-usuario-restrita';
import { EventosPage } from '../eventos/eventos';
import { BuscaPage } from '../busca/busca';
import { OntoarteVerPage } from './../ontoarte-ver/ontoarte-ver';
import { AovivoVideosPage } from '../aovivo-videos/aovivo-videos';
import { TimelinePage } from '../timeline/timeline';
import { AssinarAndroidPageModule } from '../assinar-android/assinar-android';

@Component({
  selector: 'page-tela-teste',
  templateUrl: 'tela-teste.html',
})
export class TelaTestePage {

  diseases = [
    { title: "Type 1 Diabetes", description: "Type 1 diabetes is an autoimmune disease in which the body’s immune system attacks and destroys the beta cells in the pancreas that make insulin." },
    { title: "Multiple Sclerosis", description: "Multiple sclerosis (MS) is an autoimmune disease in which the body's immune system mistakenly attacks myelin, the fatty substance that surrounds and protects the nerve fibers in the central nervous system." },
    { title: "Crohn's & Colitis", description: "Crohn's disease and ulcerative colitis (UC), both also known as inflammatory bowel diseases (IBD), are autoimmune diseases in which the body's immune system attacks the intestines." },
    { title: "Lupus", description: "Systemic lupus erythematosus (lupus) is a chronic, systemic autoimmune disease which can damage any part of the body, including the heart, joints, skin, lungs, blood vessels, liver, kidneys and nervous system." },
    { title: "Rheumatoid Arthritis", description: "Rheumatoid arthritis (RA) is an autoimmune disease in which the body's immune system mistakenly begins to attack its own tissues, primarily the synovium, the membrane that lines the joints." }
  ];
  shownGroup = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

  abrirPaginaHome() {
    this.navCtrl.setRoot(TimelinePage);
  }
  abrirPaginaTitulos() {
    this.navCtrl.setRoot(TitulosPage);
  }
  abrirPaginaPublicacoes() {
    this.navCtrl.setRoot(TitulosLivrosPage);
  }
  abrirPaginaPl() {
    this.navCtrl.setRoot(RevistaPlPage);
  }
  abrirPaginaOntoarte() {
    this.navCtrl.setRoot(OntoartePage);
  }
  abrirPaginaAovivo() {
    this.navCtrl.setRoot(AovivoVideosPage);
  }
  abrirPaginaAreaUsuarioRestrita() {
    this.navCtrl.setRoot(AreaUsuarioRestritaPage);
  }
  abrirPaginaEventos() {
    this.navCtrl.setRoot(EventosPage);
  }
  abrirPaginaBusca() {
    this.navCtrl.setRoot(BuscaPage);
  }
}
