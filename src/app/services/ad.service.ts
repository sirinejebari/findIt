/**
 * Created by sirine on 6/13/17.
 */
import { Injectable }              from '@angular/core';
import {Http,Headers, RequestOptions, Response}          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Ad } from '../models/ad';

@Injectable()
export class AdService {
  private adsUrl = 'http://localhost:3000/ads/search';  // URL to web API

  constructor (private http: Http) {}


  getAds(searchParams): Observable<Ad[]> {
let body = JSON.stringify(searchParams);

    let options = new RequestOptions({
      body: body
    });

    return this.http.post(this.adsUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
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
