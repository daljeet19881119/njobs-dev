import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { HomePage } from '../../home/home';

/**
 * Generated class for the CandidatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate',
  templateUrl: 'candidate.html',
})
export class CandidatePage {
  
  name: string;
  email: string;
  mobileno: number;
  city: string;
  state: string;
  country: string;
  address1: string;
  address2: string;
  password: any;
  cpassword: any;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

      // get email from nav params
      this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatePage');
  }

  // saveCandidate
  saveCandidate() {

    // call laoder function
    this.createLoader();
    
    // request to server
    this.userService.insertCandidate(this.name, this.email, this.mobileno, this.city, this.state, this.country, this.address1, this.address2, this.password).subscribe(data => {
      
      // check if msg == success
      if(data.msg == 'success')
      {
          this.navCtrl.push(HomePage, {userRole: 'candidate'});
          this.loader.dismiss();
      }
      if(data.msg == 'err')
      {
        this.loader.dismiss();
      }
    }, err => {
      console.log(err);
      this.loader.dismiss();
    });  
  }

  // passwordValidation
  passwordValidation() {
    const alert = this.alertCtrl.create({
          message: 'Password or Confirm password does not mathced.',
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
