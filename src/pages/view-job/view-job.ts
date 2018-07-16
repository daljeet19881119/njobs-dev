import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-job',
  templateUrl: 'view-job.html',
})
export class ViewJobPage {

  jobTitle: string;
  jobDesc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // get jobtitle and jobdesc from navparams
    this.jobTitle = this.navParams.get('title');
    this.jobDesc = this.navParams.get('desc');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewJobPage');
  }

}
