import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import { VerifyPage } from '../verify/verify';
import { UserProvider } from '../../../providers/user/user';
import { VerifyPage } from '../verify/verify';

/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  email: string;
  userRole: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }

  // gotoVerifyPage
  gotoVerifyPage() {
    // this.navCtrl.push(VerifyPage);
  }

  // sendVerificatonCode
  sendVerficationCode() {

    // check if email and userRole not empty then send verification code
    if(this.email != null && this.userRole != null)
    {
          // call function create Loader
        this.createLoader();

        // request to server
        this.userService.emailVerification(this.email,this.userRole).subscribe(data => {
          
          // check if message success
          if(data.msg == 'success')
          {
            this.loader.dismiss();
            this.navCtrl.push(VerifyPage, {
                email: this.email,
                userRole: this.userRole
            });
          }

          // check if msg err
          if(data.msg == 'err')
          {
            this.loader.dismiss();
          }
        }, err => {
          console.log('err: '+err);
          this.loader.dismiss();
        })
    }
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
