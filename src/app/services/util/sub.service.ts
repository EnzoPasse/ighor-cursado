import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SubService {

  private subjects: Subject<any>[] = [];

      publish(eventName: string) {
          // asegurar que el nombre del asunto(subject) exista en el evento
          this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();

          //publicar el evento
          this.subjects[eventName].next();
      }

      on(eventName: string): Observable<any> {
          // asegurar que el nombre del asunto(subject) exista en el evento
          this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();

          //retorna un observable
          return this.subjects[eventName].asObservable();
      }


}
