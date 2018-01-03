// angular
import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { CalleCompleterService } from '../../services/calle-completer.service';
import { ConfigService } from '../../services/util/config.service';
import { CompleterService, CompleterItem } from 'ng2-completer';
import { ICalleBarrio, ICalle } from './../shared/interfaces/interfaces';


@Component({
  selector: 'app-calle-edit',
  templateUrl: './calle-edit.component.html',
  styles: []
})
export class CalleEditComponent implements OnInit {

  @Input() title: string;
  @Input() nueva: boolean;
  @Input() calleBarrio: ICalleBarrio;
  @Output() onClosed = new EventEmitter();
  @Output() onSaved: EventEmitter<ICalleBarrio> = new EventEmitter<ICalleBarrio>();
  private searchStr: string;
  private dataService: CalleCompleterService;
  private calleSelected: ICalle = <ICalle>null;
  @Output() bindModelCalleBarrioChange = new EventEmitter<any>();


  constructor(private completerService: CompleterService, private http: Http, private _cs: ConfigService) {
    this.dataService = new CalleCompleterService(http, _cs);
  }


  ngOnInit() {
    this.calleSelected = new ICalle();
  }

  hideChildModal() {
    this.onClosed.emit();
  }
  save(formulario: NgForm) {
    this.calleBarrio.calle.nombre = this.calleBarrio.calle.nombre.toUpperCase();
    this.calleBarrio.noNomenclado = this.calleBarrio.noNomenclado ? 1 : 0;
    this.calleBarrio.calle = Object.assign({}, this.calleSelected);
    console.log("OBJETO DENTRO DEL EDIT:" + JSON.stringify(this.calleBarrio));
    this.onSaved.emit(this.calleBarrio);
  }

  private callechange(calleParam: any) {

    // if (calleParam.originalObject) {
    //   // no hacer Object.assign por que modifica al objeto
    //   this.calleSelected.idCalle = calleParam.originalObject.idCalle ? calleParam.originalObject.idCalle : null;
    //   this.calleSelected.nombre = calleParam.originalObject.nombre ? calleParam.originalObject.nombre : "";
    //
    // } else {
      this.calleSelected.idCalle = null;
      this.calleSelected.nombre = calleParam ? calleParam : "";
    // }
    console.log("CALLESELECTED:" + JSON.stringify(this.calleSelected));
  }

  //Esta bosta se ejecuta cada vez que se produce un cambio en el objeto
  public onCalleBarrioSelected(selected: CompleterItem) {
    if (selected) {
      // this.callechange(selected);
      // this.bindModelCalleBarrioChange.emit( this.calleSelected );
    }

  }

  public onLoseFocus(param: any) {
    // this.bindModelCalleBarrioChange.emit(param);
    if (param) {
      this.callechange(param);
    }

  }




}
