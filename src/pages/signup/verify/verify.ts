import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { EmployerPage } from '../employer/employer';
import { CandidatePage } from '../candidate/candidate';
import { UserProvider } from '../../../providers/user/user';

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

  verificationCode: number;
  email: string;
  userRole: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    // get user role
    this.userRole = this.navParams.get('userRole');
    this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
  }

  // verifycode
  verifyCode() {
    
    // call loader functin
    this.createLoader();
    
    let page;

    // goto next page depending on userRole
    if(this.userRole == 'employer')
    {
      page = EmployerPage;
    }
    if(this.userRole == 'candidate')
    {
      page = CandidatePage;   
    }

    // request to server
    this.userService.checkVerificationCode(this.email, this.userRole, this.verificationCode).subscribe(data => {
      
      // check if verification code mathced
      if(data.msg == 'success')
      {
        this.navCtrl.push(page, {
          email: this.email
        });

        this.loader.dismiss();
      }
      if(data.msg == 'err')
      {
        this.verificationAlert();
      }
    }, err => {
      console.log('err: '+err);
      this.loader.dismiss();
    });
  }

  // reSendVerficationCode
  reSendVerficationCode() {

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

  // verificationAlert
  verificationAlert() {
    const alert = this.alertCtrl.create({
      message: 'Your verification code does not matched.',
      buttons: ['ok']
    });
    alert.present();
  }
}
