/**
 * Created by sirine on 6/24/17.
 */

import { Injectable }              from '@angular/core';
import {Http,Headers, BaseRequestOptions, RequestOptions, Response}          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthentificationService {
  private signInUrl = 'http://localhost:3000/authenticate';  // URL to web API

  constructor (private http: Http) {}


  signIn(credentials) {
    let body = JSON.stringify(credentials);

    let options = new RequestOptions({
      body: body
    });

    return this.http.post(this.signInUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    if(body.success){
     localStorage.setItem('jwt', body.token);

    }
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
export class CustomRequestOptions extends BaseRequestOptions {
  constructor(jwt) {
    super();
    this.headers.append('x-access-token', localStorage.getItem('jwt'));
    this.headers.append('Content-Type', 'application/json')
  }
}
