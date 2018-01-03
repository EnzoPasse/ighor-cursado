//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

//Animaciones de angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { APP_ROUTING } from './app.router';
import { ProvinciaListComponent, ProvinciaEditComponent, SearchProvinciaPipe } from './components/provincia/index-provincia';
import { LocalidadEditComponent, LocalidadListComponent } from './components/localidad/index-localidad';
import { ZonaListComponent, ZonaEditComponent } from './components/zona/index-zona';
import { BarrioEditComponent, BarrioListComponent } from './components/barrio/index-barrio';
import { CalleEditComponent, CalleListComponent, CalleAutocomplete } from './components/calle/index-calle';
import { NormaBarrioComponent, CriterioComponent } from './components/norma-barrio/index-norma-barrio';
import { NormaCalleComponent, CriterioCalleComponent} from './components/norma-calle/index-norma-calle';
import { HojaDeRutaComponent } from './components/hoja-de-ruta/index-hoja-ruta';

//Services
import { ConfigService, ItemsService, NotificationService, SubService, SearchService } from './services/util/index-util-service';
import { ProvinciaService, LocalidadService, CuadranteService, BarrioService, CalleService } from './services/index-service';
import { NormalizaBarrioService , NormalizaCalleService, HojaRutaService } from './services/index-service';

//Adicionales
// para la paginacion
import { NgxPaginationModule } from 'ngx-pagination';
// para la bara de progreso
import { NgProgressModule } from 'ngx-progressbar';
// barra de progeso asociado a cada peticion http
import { BrowserXhr } from '@angular/http';
import { NgProgressBrowserXhr } from 'ngx-progressbar';
// no se bien
import { Ng2BootstrapModule } from "ng2-bootstrap";
// para los form modales
import { ModalModule, TooltipModule } from 'ng2-bootstrap';
import { Ng2CompleterModule } from 'ng2-completer';
//para los pdf
import { PdfViewerComponent } from 'ng2-pdf-viewer';

// para usar el pipe de filtrado,,, no se usa
import { HeaderComponent } from './components/shared/components/header.component';

//directivas
import { ResaltadoDirective } from './components/shared/directives/resaltado.directive';
import { OnlyNumber } from './components/shared/directives/only-numbers.directive';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProvinciaListComponent,
    ProvinciaEditComponent,
    LocalidadListComponent,
    LocalidadEditComponent,
    ZonaListComponent,
    ZonaEditComponent,
    BarrioListComponent,
    BarrioEditComponent,
    NormaBarrioComponent,
    CriterioComponent,
    CalleListComponent,
    CalleAutocomplete,
    CalleEditComponent,
    NormaCalleComponent,
    CriterioCalleComponent,
    HojaDeRutaComponent,
    ResaltadoDirective,
    OnlyNumber,
    HeaderComponent,
    SearchProvinciaPipe,
    PdfViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    APP_ROUTING,
    NgxPaginationModule,
    Ng2BootstrapModule,
    NgProgressModule,
    Ng2CompleterModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()

  ],
  exports: [ // export for the DemoModule
    AppComponent,
    CriterioComponent,
    BrowserModule
  ],

  providers: [
    ConfigService,
    ItemsService,
    NotificationService,
    SubService,
    ProvinciaService,
    LocalidadService,
    CuadranteService,
    BarrioService,
    CalleService,
    NormalizaBarrioService,
    NormalizaCalleService,
    HojaRutaService,
    SearchService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
