
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response } from "@angular/http";

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { CalleCompleterService } from '../../services/calle-completer.service';
import { ICalleBarrio } from '../shared/interfaces/interfaces';
import { ConfigService } from '../../services/util/config.service';

import { CompleterService, CompleterItem } from 'ng2-completer';

import './autocomplete.component.css';


@Component({
  selector: 'app-calleAutocomplete',
  template:
  `
  <div [class.has-danger]="!callename.valid">
  <ng2-completer
     name="callename"
     #callename="ngModel"
     [datasource]="dataService"
     [(ngModel)]="calle"
     (selected)="onCalleBarrioSelected($event)"
     (blur)="onLoseFocus(callename.value)"
     [minSearchLength]="3"
     [disableInput]="false"
     [placeholder]="'Buscar calle...'"
     [textSearching]="'Espere por favor...'"
     [inputClass]="(callename.valid) ? 'form-control' : 'form-control form-control-danger'"
     [textNoResults]="'DESCRIPCION INEXISTENTE, Se agregará a NUEVA CALLE'" required>
 </ng2-completer>
 <div *ngIf="!callename.valid" class="form-control-feedback">
     La calle es necesaria
 </div>
 </div>
 ` ,

})

export class CalleAutocomplete {

  private calleSelected: any = null;
  private isSelected =false;
  private searchStr: string;
  private dataService: CalleCompleterService;
  @Output() bindModelCalleBarrioChange = new EventEmitter<any>();

  // @Input() bindModelCalleBarrio: ICalleBarrio;
  // @Input() disableAutocomplete: boolean = false;


  constructor(private completerService: CompleterService, private http: Http, private _cs: ConfigService) {
    this.dataService = new CalleCompleterService(http, _cs);
  }


  public onCalleBarrioSelected(selected: CompleterItem) {
    if (selected != null) {
      this.calleSelected = selected;
    this.bindModelCalleBarrioChange.emit( this.calleSelected );
    }
      // console.log("CALLE SELECTED:" + JSON.stringify(this.calleSelected));
  }

  public onLoseFocus(param: any) {
    // console.log("LOST FOCUS:" + JSON.stringify(param));
    // console.log("CALLE SELECTED:" + JSON.stringify(this.calleSelected));
    this.bindModelCalleBarrioChange.emit(param);


  }

}
