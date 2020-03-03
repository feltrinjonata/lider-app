import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Storage } from '@ionic/storage';
//import { AppAds } from '../appads/AppAds';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';
import { TimelinePage } from '../../pages/timeline/timeline';

/*
  In App Purchases
  This is a provider, you need to add this to your app module then call the methods from somewhere else
  See http://scottbolinger.com/cordova-in-app-purchases-validating-subscriptions for tutorial
  Required plugin: http://ionicframework.com/docs/native/in-app-purchase/
  Also see https://github.com/AlexDisler/cordova-plugin-inapppurchase
*/
@Injectable()
export class IAP {

  productId: string;
  Qual_iduser : any = {}; 

  AssinarCliqueMsg : any = {}; 
  AssinarCliqueAcao : any = {}; 
  public headers: any = {};
  constructor( 
    private iap: InAppPurchase,
    //public appads: AppAds,
    public storage: Storage,
    private http: Http,
    public events: Events
  ){

		this.storage.get('QualUser').then((val) => {
      this.Qual_iduser = val;
    }); 

  }

  checkStatus() {

    // nested promises, oh my!
    return new Promise( (resolve, reject) => {

        // first, ask Apple for the receipt. We get back an encrypted string.
        this.iap.getReceipt()
        .then( receipt => {

          //console.log('encoded', receipt)

          return receipt

        })
        .then( receiptData => {

          // next, validate the encoded receipt with Apple, and get back the human readable format
          this.validateReceipt( receiptData ).then( receipt => {

            console.log('validate receipt response', receipt)

            // finally, send the receipt to the server and resolve the promise with the result
            this.sendReceiptToServer(receipt).then( validity => {
              console.log('validity response', validity)
              resolve( validity )
            })

          })

        })
        .catch( err => {

          //let error = this.getErrMsg( err );

          reject( err )
          console.log(err)

        })

    })

  }

  validateReceipt( receiptData ) {

    return new Promise( (resolve ) => {

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      let data = {
        'password': 'c2108d376d024df2929bc0df3e564f86', 
        'receipt': receiptData
      }

      let url = 'http://app.progettoapp.com.br/midias-lider/apple_status.php'

      this.http.post( url, data, options )
      .subscribe(response => {

        let receipt = JSON.parse(response['_body']).receipt.in_app
        console.log('nedo nedo', receipt);
        resolve(receipt)

      },
      error => {
        resolve(false)
        console.log(error);
      })

    })

  }

  sendReceiptToServer( receipt ) {

    return new Promise( (resolve ) => {

        console.log( 'sendReceiptToServer', receipt )

        let url = 'http://app.progettoapp.com.br/midias-lider/apple_status2.php' // url to the PHP file or endpoint, see code below

        let data = {
          receipt: JSON.stringify( receipt )
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post( url, data, options )
          .subscribe(response => {

            console.log('server response', response)
            // This is the end of the road. We resolve with the server response so we know if the subscription is active or not.
            resolve( response['_body'] );

          },
          error => {
            resolve(false)
            // probably a bad url or 404
            console.log(error);
          })

    })

  }
  
}