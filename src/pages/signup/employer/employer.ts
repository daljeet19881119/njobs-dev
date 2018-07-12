import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployerPage');
  }

  // saveEmployer
  saveEmployer() {
    // request to server
    this.userService.insertEmployer(this.name, this.email, this.mobileno, this.city, this.state, this.country, this.companyName, this.companyAddress, this.companyWebsite).subscribe(data => {
      console.log(data);
    }, err => {
      console.log('err: '+err);
    });
  }
}
