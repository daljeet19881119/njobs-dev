import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { HomePage } from '../../home/home';

/**
 * Generated class for the EmployerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employer',
  templateUrl: 'employer.html',
})
export class EmployerPage {

  name: string;
  email: string;
  mobileno: number;
  city: string;
  state: string;
  country: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  password: any;
  cpassword: any;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

      // get email from nav params
      this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployerPage');
  }

  // saveEmployer
  saveEmployer() {

    // call laoder function
    this.createLoader();

    // request to server
    this.userService.insertEmployer(this.name, this.email, this.mobileno, this.city, this.state, this.country, this.companyName, this.companyAddress, this.companyWebsite, this.password).subscribe(data => {

      // check if msg == success
      if(data.msg == 'success')
      {
          this.navCtrl.push(HomePage, {userRole: 'employer', employer_id: data.id});
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
