import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhaListaAudiosPage } from './minha-lista-audios';

@NgModule({
  declarations: [
    MinhaListaAudiosPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhaListaAudiosPage),
  ],
})
export class MinhaListaAudiosPageModule {}
