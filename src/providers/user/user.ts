import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  siteUrl: string = 'http://localhost/ci/';

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  // emailVerification
  emailVerification(email: string, userRole: string) {

    // set headers
    let headers = new Headers();
    headers.append("Accept","application/json");
    
    // set request options
    let options = new RequestOptions({headers: headers});

    // set data to be send 
    let data = JSON.stringify({
        email: email
    });

    let url: string;

    // set url on according to userRole
    if(userRole == 'employer')
    {
      url = this.siteUrl+'api/employer/employer/employerEmailVerification';
    }
    if(userRole == 'candidate')
    {
      url = this.siteUrl+'api/candidate/candidate/candidateEmailVerification';
    }

    return this.http.post(url, data, options).map(res => res.json());
  }

  // checkVerificationCode
  checkVerificationCode(email: string, userRole: string, verficationCode: number) {

    // set headers
    let headers = new Headers();
    headers.append("Accept","application/json");

    // set request options
    let options = new RequestOptions({headers: headers});

    // set data to be send
    let data = JSON.stringify({
        verificationCode: verficationCode,
        email: email
    });

    let url: string;

    // set url on according to userRole
    if(userRole == 'employer')
    {
      url = this.siteUrl+'api/employer/employer/checkVerificationCode';
    }
    if(userRole == 'candidate')
    {
      url = this.siteUrl+'api/candidate/candidate/checkVerificationCode';
    }

    return this.http.post(url, data, options).map(res => res.json());
  }

  // insertCandidate
  insertCandidate(name: string, email: string, mobileno: number, city: string, state: string, country: string, address1: string, address2) {

    // set headers
    let headers = new Headers();
    headers.append("Accept","application/json");

    // set request options
    let options = new RequestOptions({headers: headers});

    // set data to be send
    let data = JSON.stringify({
        name: name,
        email: email,
        mobileno: mobileno,
        city: city,
        state: state,
        country: country,
        address1: address1,
        address2: address2
    });

    let url = this.siteUrl+'api/candidate/candiate/insertCandidate';

    return this.http.post(url, data, options).map(res => res.json());
  }

  // insertEmployer
  insertEmployer(name: string, email: string, mobileno: number, city: string, state: string, country: string, companyName: string, companyAddress: string, companyWebsite: string) {

    // set headers
    let headers = new Headers();
    headers.append("Accept","application/json");

    // set request options
    let options = new RequestOptions({headers: headers});

    // set data to be send
    let data = JSON.stringify({
        name: name,
        email: email,
        mobileno: mobileno,
        city: city,
        state: state,
        country: country,
        companyName: companyName,
        companyAddress: companyAddress,
        companyWebsite: companyWebsite
    });

    let url = this.siteUrl+'api/employer/employer/insertEmployer';

    return this.http.post(url, data, options).map(res => res.json());
  }
}
