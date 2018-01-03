import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IProvincia } from './../components/shared/interfaces/interfaces';
import { ConfigService } from '../services/util/config.service';


@Injectable()
export class ProvinciaService {

  baseUrl: string = "";

  constructor(private http: Http,
    private _cs: ConfigService) {
    this.baseUrl = _cs.getApiURI();
  }

  getAll(): Observable<IProvincia[]> {

    let url = `${this.baseUrl}/provincia`;
    console.log("GET-ALL URL: " + url);

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)

  }

  getById(clave: number): Observable<IProvincia> {

    let url = `${this.baseUrl}/provincia/${clave}`;
    console.log("GET-BY-ID URL: " + url);

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  remove(clave: number) {

    let url = `${this.baseUrl}/provincia/${clave}`;
    console.log("DELETE URL: " + url);

    return this.http.delete(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  update(provincia: IProvincia): Observable<IProvincia> {
    let headers = new Headers({ 'Content-Type': 'application/json ; charset=UTF-8' });
    let body = JSON.stringify(provincia);

    console.log("ACTUALIZANDO");
    let url = `${this.baseUrl}/provincia/${provincia.IdProvincia}`;
    let options = new RequestOptions({ headers: headers, method: "PUT" });

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  save(provincia: IProvincia): Observable<IProvincia> {
    let headers = new Headers({ 'Content-Type': 'application/json ; charset=UTF-8' });
    let body = JSON.stringify(provincia);

    console.log("CREANDO");
    let url = `${this.baseUrl}/provincia`;
    let options = new RequestOptions({ headers: headers, method: "POST" });

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }


  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    console.log("ERROR APP catch: " + JSON.stringify(error.json()));
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      console.log("ERROR SERVER catch: " + JSON.stringify(error.json()));
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

    return Observable.throw(applicationError || modelStateErrors || ' Server error');
  }

}
