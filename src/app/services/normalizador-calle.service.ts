import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConsultaCalle, IListaMal } from './../components/shared/interfaces/interfaces';
import { ConfigService } from '../services/util/config.service';


@Injectable()
export class NormalizaCalleService {

  baseUrl: string = "";

  constructor(private http: Http,
    private _cs: ConfigService) {
    this.baseUrl = _cs.getApiURI();
  }



  getList(consulta: ConsultaCalle): Observable<IListaMal[]> {
    let headers = new Headers({ 'Content-Type': 'application/json ; charset=UTF-8' });
    let body = JSON.stringify(consulta);
    let url = `${this.baseUrl}/normalizadorcalle/listar`;
    let options = new RequestOptions({ headers: headers, method: "POST" });

    console.log("LISTANDOOOOOOOO");

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);


  }

getFiltros(clave:number): Observable<ConsultaCalle>{
  let url = `${this.baseUrl}/normalizadorcalle/filtros/${clave}`;
    console.log("GET URL: " + url);

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);


}


normalizar(consulta:ConsultaCalle){
  let headers = new Headers({ 'Content-Type': 'application/json ; charset=UTF-8' });
  let body = JSON.stringify(consulta);
  let url = `${this.baseUrl}/normalizadorcalle/${consulta.calleConsulta}`;
  let options = new RequestOptions({ headers: headers, method: "PUT" });

  console.log("NORMALIZANDOOOOOO");
   return this.http.put(url,body, options)
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
