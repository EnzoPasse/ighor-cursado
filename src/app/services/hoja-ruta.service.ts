import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IBarrio } from './../components/shared/interfaces/interfaces';
import { ConfigService } from '../services/util/config.service';

@Injectable()
export class HojaRutaService {
  baseUrl: string = "";

  constructor(private http: Http,
              private _cs: ConfigService) {
    this.baseUrl = _cs.getApiURI();
  }


  public getByIdBarrio(clave: number) {

    let url = `${this.baseUrl}/hojaruta/${clave}`;
    console.log("GET URL: " + url);

     return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // public downloadUint8Array(clave: number): Observable<Uint8Array> {
  //   let url = `${this.baseUrl}/hojaruta/${clave}`;
  //   console.log("GET URL: " + url);
  //
  //    return this.http
  //      .get(url, { responseType: ResponseContentType.ArrayBuffer })
  //      .map((response: Response) => response.arrayBuffer())
  //      .map((arrayBuffer: ArrayBuffer) => new Uint8Array(arrayBuffer))
  //     .first();
  //
  //  }



  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    console.log("ERROR catch: " + JSON.stringify(error.json()));
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }
    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(applicationError || modelStateErrors.toUpperCase() || ' Server error');
  }

}
