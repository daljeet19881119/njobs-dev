import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  userRole: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // loginUser
  loginUser() {
    
    // check if email and password not empty
    if(this.email != null && this.password != null && this.userRole != null)
    { 
        // call loader function
        this.createLoader();
    
        // request to server
        this.loginService.loginUser(this.email, this.password, this.userRole).subscribe(data => {

          // check if msg success
          if(data.msg == 'success')
          {
            this.navCtrl.push(HomePage);
            this.loader.dismiss();
          }
          if(data.msg == 'err')
          {
            this.loader.dismiss();
            this.createAlert();
          }
        }, err => {
          console.log(err);
          this.loader.dismiss();
        });
    }
  }

  // createAlert
  createAlert() {
    const alert = this.alertCtrl.create({
          message: 'Your email or password is incorrect.',
          buttons: ['ok']
    });
    alert.present();
  }

  // createLoader
  createLoader() {
      this.loader = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'please wait...'
      });
      this.loader.present();
  }
}
