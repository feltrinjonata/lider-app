import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
})
export class PdfPage {
	 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
	item = this.navParams.get('item');
  pdfSrc: any= 'http://www.redeplaneje.com.br/midias-lider/r/livros/' + this.item['Arquivo'];

}
