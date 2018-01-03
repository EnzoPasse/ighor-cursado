import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CompleterData, CompleterItem } from 'ng2-completer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ICalleBarrio } from './../components/shared/interfaces/interfaces';
import { ConfigService } from '../services/util/config.service';


export class CalleCompleterService extends Subject<CompleterItem[]> implements CompleterData {

  baseUrl: string = "";

  constructor(private http: Http,
    private _cs: ConfigService) {
    super();
    this.baseUrl = _cs.getApiURI();
  }

  // public search(term: string): void {
  //
  //   let headers = new Headers({ 'Content-Type': 'application/json ; charset=UTF-8' });
  //   // let body = JSON.stringify(term);
  //   let body = {
  //     barrio: {
  //       IdBarrio: 25
  //     },
  //     calle: {
  //       nombre: `${term}`
  //     }
  //   }
  //
  //
  //   let url = `${this.baseUrl}/callexbarrio/like/null`;
  //   let options = new RequestOptions({ headers: headers, method: "PUT" });
  //
  //   console.log("COMPLETER URL: " + url);
  //
  //   this.http.put(url, body, options)
  //     .map((res: Response) => {
  //       // Convert the result to CompleterItem[]
  //       let data = res.json();
  //       let matches: CompleterItem[] = data.map((callexbarrio: any) => this.convertToItem(callexbarrio));
  //       this.next(matches);
  //     })
  //     .subscribe();
  //
  // }


  public search(term: string): void {

    let url = `${this.baseUrl}/calle/like/${term}`;

    this.http.get(url)
      .map((res: Response) => {
        // Convert the result to CompleterItem[]
        let data = res.json();
        let matches: CompleterItem[] = data.map((calle: any) => this.convertToItem(calle));
        this.next(matches);
      })
      .subscribe();

  }


  //handle cancel
  public cancel() { }

  public convertToItem(data: any): CompleterItem | null {
    if (!data) {
      return null;
    }
    // data will be string if an initial value is set
    return {
       title: typeof data === "string" ? data : data.nombre ,
       originalObject: data

    } as CompleterItem;
  }

}
