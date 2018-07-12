import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatePage');
  }

  // saveCandidate
  saveCandidate() {

    // request to server
    this.userService.insertCandidate(this.name, this.email, this.mobileno, this.city, this.state, this.country, this.address1, this.address2).subscribe(data => {
      console.log(data);
    }, err => {
      console.log('err: '+err);
    });
  }

}
