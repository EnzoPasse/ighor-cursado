// angular
import { Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

//modelo
import {  ICuadrante } from './../shared/interfaces/interfaces';


@Component({
  selector: 'app-zona-edit',
  templateUrl: './zona-edit.component.html',
  styles: []
})
export class ZonaEditComponent {


    @Input() title: string;
    @Input() cuadrante : ICuadrante;
    @Output() onClosed = new EventEmitter();
    @Output() onSaved: EventEmitter<ICuadrante> = new EventEmitter<ICuadrante>();

    constructor() {

    }
    hideChildModal() {
      this.onClosed.emit();
    }
    save(formulario: NgForm) {
      this.cuadrante.nombre = this.cuadrante.nombre.toUpperCase();
      this.onSaved.emit(this.cuadrante);
    }
  }
