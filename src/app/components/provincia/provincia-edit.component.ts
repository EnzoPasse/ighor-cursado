// angular
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

//modelo
import { IProvincia } from './../shared/interfaces/interfaces';
// import { IProvincia } from './provincia-model';


@Component({
  selector: 'app-provincia-detalle',
  templateUrl: './provincia-edit.component.html',
  styles: [],


})
export class ProvinciaEditComponent  {


  @Input() title: string;
  @Input() provinciaSelected: IProvincia;
  @Output() onClosed = new EventEmitter();
  @Output() onSaved: EventEmitter<IProvincia> = new EventEmitter<IProvincia>();

  constructor() {
  }


  hideChildModal() {
    this.onClosed.emit();
  }
  save(formulario: NgForm) {
    this.provinciaSelected.nombre = this.provinciaSelected.nombre.toUpperCase();
    this.onSaved.emit(this.provinciaSelected);
  }
}
