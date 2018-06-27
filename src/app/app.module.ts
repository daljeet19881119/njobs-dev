import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { VerificationPage } from '../pages/signup/verification/verification';
import { VerifyPage } from '../pages/signup/verify/verify';
import { CandidatePage } from '../pages/signup/candidate/candidate';
import { EmployerPage } from '../pages/signup/employer/employer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    VerificationPage,
    VerifyPage,
    CandidatePage,
    EmployerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    VerificationPage,
    VerifyPage,
    CandidatePage,
    EmployerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
