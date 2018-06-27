import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { VerificationPage } from '../signup/verification/verification';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  // this function to call the signup page
  gotoSignUpPage(){
    this.navCtrl.push(VerificationPage);
  }

  // this function to direct goes to login
  gotoLoginPage(){
    this.navCtrl.push(LoginPage);
  }

}
