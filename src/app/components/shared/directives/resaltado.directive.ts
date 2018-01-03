import { Directive,ElementRef, HostListener,Input} from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(private el:ElementRef) {
   el.nativeElement.style.backgroundColor="Beige";
   }

@Input( "appResaltado") // declaro la variable que va a venir desde el html en el componente
nuevoColor:string;

@HostListener('mouseenter') // cuando el mouse por el componente
pasaElMouse(){
  this.cambioColor(this.nuevoColor);
}

@HostListener('mouseleave') // cuando el mouse deja el componente
saleElMouse(){
  this.cambioColor(null); // null en typeScript es un string valido
}

private cambioColor(color:string = "yellow"){  // si no recibe ningun color es yellows
  this.el.nativeElement.style.backgroundColor=color;


}



}
