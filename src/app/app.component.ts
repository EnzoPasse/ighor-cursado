import { Component, ViewContainerRef } from '@angular/core';
import { AlertComponent } from 'ng2-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private viewContainerRef: ViewContainerRef;
   public constructor(viewContainerRef: ViewContainerRef) {
       // You need this small hack in order to catch application 
       // root view container ref
       this.viewContainerRef = viewContainerRef;
   }

}
