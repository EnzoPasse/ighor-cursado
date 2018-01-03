//angular
import { Routes } from '@angular/router';
//component
import { LocalidadEditComponent } from './localidad-edit.component';

export const LOCALIDAD_ROUTES: Routes = [
  { path: 'nuevo', component: LocalidadEditComponent },
  { path: 'editar/:id', component: LocalidadEditComponent }
  //{ path: '**', pathMatch: 'full', redirectTo: 'localidad' }
];
