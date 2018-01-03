//angular
import { Routes } from '@angular/router';
//component
import { ProvinciaEditComponent } from './provincia-edit.component';

export const PROVINCIA_ROUTES: Routes = [
  { path: 'nuevo', component: ProvinciaEditComponent },
  { path: 'editar/:id', component: ProvinciaEditComponent }
  //{ path: '**', pathMatch: 'full', redirectTo: 'nuevo' }
];
