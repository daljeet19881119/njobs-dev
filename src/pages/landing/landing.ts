import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { VerificationPage } from '../signup/verification/verification';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  latlongArr: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private push: Push, public alertCtrl: AlertController, public platform: Platform, private localNotifications: LocalNotifications, private geolocation: Geolocation) {

      // to check if we have permission
      this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
          this.initPush();
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }


  // initPush
  initPush() {

      // to initialize push notifications
      const options: PushOptions = {
        android: {},
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      };

      const pushObject: PushObject = this.push.init(options);


      pushObject.on('notification').subscribe((notification: any) => 
        {
          const alert = this.alertCtrl.create({
            title: 'Njobs Notification',
            message: notification.message,
            buttons: ['ok']
          });
          alert.present();
          
          console.log('Received a notification', notification);
        }
      );

      pushObject.on('registration').subscribe((registration: any) => 
          console.log('Device registered', registration)
      );

      pushObject.on('error').subscribe(error => 
          console.error('Error with Push plugin', error)
      );
  }
  
  // pushNotification
  pushNotification() {
    this.platform.ready().then(() => {

        // Schedule delayed notification
        this.localNotifications.schedule({
          id: 1,
          title: 'Njobs Notification',
          text: 'This is my first notification',            
          trigger: {at: new Date(new Date().getTime() + 10000)},
          data: {"id": 1, "name": "yogender"}
        });
    });
  }

  // get current location lat and long
  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude      
      // resp.coords.longitude      
      this.locationAlert(resp.coords.latitude, resp.coords.longitude);

      // push lat long to array
      this.latlongArr.push({
        lat: resp.coords.latitude,
        long: resp.coords.longitude
      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  // create alert
  locationAlert(lat: any, long: any) {
      const alert = this.alertCtrl.create({
            title: 'Current Location',
            message: 'Lat: '+lat+' and long: '+long,
            buttons: ['ok']
      });
      alert.present();
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
