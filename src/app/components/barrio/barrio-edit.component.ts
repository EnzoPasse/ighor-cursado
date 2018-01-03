// angular
import { Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

//modelo
import {  IBarrio } from './../shared/interfaces/interfaces';

@Component({
  selector: 'app-barrio-edit',
  templateUrl: './barrio-edit.component.html',
  styles: []
})
export class BarrioEditComponent {

      @Input() title: string;
      @Input() barrio : IBarrio;
      @Output() onClosed = new EventEmitter();
      @Output() onSaved: EventEmitter<IBarrio> = new EventEmitter<IBarrio>();

      constructor() {

      }
      hideChildModal() {
        this.onClosed.emit();
      }
      save(formulario: NgForm) {
        this.barrio.nombre = this.barrio.nombre.toUpperCase();
        this.onSaved.emit(this.barrio);
      }
    }
