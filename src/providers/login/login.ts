import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  
  siteUrl: string = 'http://localhost/ci/';

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  // loginUser
  loginUser(email: string, password: string, userRole: string) {
      
    // set headers
    let headers = new Headers();
    headers.append("Accept","application/json");

    // set reqeust options
    let options = new RequestOptions({headers: headers});

    // set data to be send
    let data = JSON.stringify({
        email: email,
        password: password
    });

    let url;

    // set url according to userRole
    if(userRole == 'employer')
    {
      url = this.siteUrl+'api/employer/employer/loginEmployer';
    }
    if(userRole == 'candidate')
    {
      url = this.siteUrl+'api/candidate/candidate/loginCandidate';
    }

    return this.http.post(url, data, options).map(res => res.json());
  }
}
