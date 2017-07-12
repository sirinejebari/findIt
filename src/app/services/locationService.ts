import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Location} from "../models/location";
import {Http,Headers, RequestOptions, Response}          from '@angular/http';

/**
 * Created by sirine on 6/15/17.
 */

@Injectable()
export class locationService {
  private citiesUrl = 'http://localhost:3000/coutry';  // URL to web API
  private localityUrl = 'http://localhost:3000/city/:id/localities';  // URL to web API

  constructor (private http: Http) {}


  getLocation(locationId, locationType): Observable<Location[]> {
    let url = "http://localhost:3000/country"

    return this.http.get(`${url}/${locationId}/${locationType}`)
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
