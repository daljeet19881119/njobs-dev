import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ViewJobPage } from '../view-job/view-job';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allJobs: any;
  userRole: string = 'employer';
  showBtn: boolean;
  employerId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider) {

    // get user role from nav params
    this.userRole = this.navParams.get('userRole');
    

    // show dashboard depend on user role
    if(this.userRole == 'candidate')
    {
        // getall jobs
        this.userService.getAllJobs().subscribe(data => {
          this.allJobs = data;
        }, err => {
          console.log(err);
        });
    }
    if(this.userRole == 'employer')
    {
        this.employerId = this.navParams.get('employer_id');

        // get all employer jobs
        this.userService.fetchEmployerJobs(this.employerId).subscribe(data => {
          this.allJobs = data;

          // check if lenght 0
          if(data.length == 0)
          {
            this.showBtn = true;
          }
        }, err => {
          console.log(err);
        });
    }
    
  }

  // viewJob
  viewJob(title: string, desc: string) {
    this.navCtrl.push(ViewJobPage, {title: title, desc: desc});
  }
}
