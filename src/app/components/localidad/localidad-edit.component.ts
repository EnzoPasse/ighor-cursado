// angular
import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

//modelo
import {  ILocalidad, IProvincia } from './../shared/interfaces/interfaces';


@Component({
  selector: 'app-localidad-edit',
  templateUrl: './localidad-edit.component.html',
  styles: [],

})
export class LocalidadEditComponent  {

    @Input() title: string;
    @Input() localidad : ILocalidad;
    @Output() onClosed = new EventEmitter();
    @Output() onSaved: EventEmitter<ILocalidad> = new EventEmitter<ILocalidad>();

    constructor() {

    }
    hideChildModal() {
      this.onClosed.emit();
    }
    save(formulario: NgForm) {
      this.localidad.nombre = this.localidad.nombre.toUpperCase();
      this.onSaved.emit(this.localidad);
    }
  }
