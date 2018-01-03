import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ICuadrante } from './../components/shared/interfaces/interfaces';
import { ConfigService } from '../services/util/config.service';


@Injectable()
export class CuadranteService {

  baseUrl: string = "";

  constructor(private http: Http,
              private _cs: ConfigService) {
    this.baseUrl = _cs.getApiURI();
  }

  getAll(): Observable<ICuadrante[]> {

    let url = `${this.baseUrl}/cuadrante`;
    console.log("GETALL URL: " + url);

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)

  }

  getById(clave: number): Observable<ICuadrante> {

    let url = `${this.baseUrl}/cuadrante/${clave}`;
    console.log("GET URL: " + url);

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getByIdLocalidad(clave: number): Observable<ICuadrante[]> {

    let url = `${this.baseUrl}/cuadrante/localidad/${clave}`;
    console.log("GET URL: " + url);

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  remove(clave: number) {

    let url = `${this.baseUrl}/cuadrante/${clave}`;
    console.log("DELETE URL: " + url);

    return this.http.delete(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  update(cuadrante: ICuadrante): Observable<ICuadrante> {
    console.log("ACTUALIZANDOOOOO");

    let headers = new Headers({ 'Content-Type': 'application/json ; charset=UTF-8' });
    let body = JSON.stringify(cuadrante);
    let url = `${this.baseUrl}/cuadrante/${cuadrante.IdCuadrante}`;
    let options = new RequestOptions({ headers: headers, method: "PUT" });

      return this.http.put(url, body, options)
        .map(this.extractData)
        .catch(this.handleError);

    }

    save(cuadrante: ICuadrante) {
      console.log("CREANDOOOOOOOOOO");
      let headers = new Headers({ 'Content-Type': 'application/json ; charset=UTF-8' });
      let body = JSON.stringify(cuadrante);
      let url = `${this.baseUrl}/cuadrante`;
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
