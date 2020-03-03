import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'page-testes',
  templateUrl: 'testes.html',
})
export class TestesPage {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      cbox: [false, TestesPage.mustBeTruthy]
    });
  }

  onSubmit() {
  }

  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }
}