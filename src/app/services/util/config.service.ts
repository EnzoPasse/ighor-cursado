import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  _apiURI: string;

  constructor() {
   this._apiURI = 'http://localhost/ighor_api/public';
    //this._apiURI = 'https://ighor-stg.rf.gd/public';
  }

  getApiURI() {
    return this._apiURI;
  }

  // getApiHost() {
  //   return this._apiURI.replace('api/', '');
  // }
}
