import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { NormaBarrioComponent } from './components/norma-barrio/norma-barrio.component';
import { NormaCalleComponent } from './components/norma-calle/index-norma-calle';

import { ProvinciaListComponent, PROVINCIA_ROUTES } from './components/provincia/index-provincia';
import { LocalidadListComponent, LOCALIDAD_ROUTES } from './components/localidad/index-localidad';
import { ZonaListComponent } from './components/zona/index-zona';
import { BarrioListComponent } from './components/barrio/index-barrio';
import { CalleListComponent } from './components/calle/index-calle';
import { HojaDeRutaComponent } from './components/hoja-de-ruta/index-hoja-ruta';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'normalizacionBarrio', component: NormaBarrioComponent },
  { path: 'normalizacionCalle', component: NormaCalleComponent },
  { path: 'hojaDeRuta', component: HojaDeRutaComponent },
  { path: 'provincia', component: ProvinciaListComponent},
  { path: 'zona', component: ZonaListComponent},
  { path: 'localidad', component: LocalidadListComponent, children: LOCALIDAD_ROUTES },
  { path: 'barrio', component: BarrioListComponent },
  { path: 'calle', component: CalleListComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
