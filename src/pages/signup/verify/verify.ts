import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployerPage } from '../employer/employer';
import { CandidatePage } from '../candidate/candidate';

/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
  }

  // gotoEmployerPage
  gotoEmployerPage() {
    this.navCtrl.push(EmployerPage);
  }

  // gotoCandidatePage
  gotoCandidatePage() {
    this.navCtrl.push(CandidatePage);
  }
}
