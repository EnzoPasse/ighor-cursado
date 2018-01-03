//angular
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ViewContainerRef } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

// rxjs

import { NotificationService } from './../../services/util/index-util-service';
import { ProvinciaService, LocalidadService, CuadranteService, BarrioService, HojaRutaService } from './../../services/index-service';
//modelo
import { IProvincia, ILocalidad, ICuadrante, IBarrio } from './../shared/interfaces/interfaces';
//form modal
import { ModalDirective, ModalModule } from 'ng2-bootstrap';

@Component({
  selector: 'app-hoja-de-ruta',
  templateUrl: './hoja-de-ruta.component.html',
  styles: []
})
export class HojaDeRutaComponent implements OnInit {

  // @ViewChild('childModal') public childModal: ModalDirective;
  localidades: ILocalidad[] = [];
  provincias: IProvincia[] = [];
  cuadrantes: ICuadrante[] = [];
  barrios: IBarrio[] = [];
  // calles: ICalleBarrio[] = [];
  provinciaSelected: IProvincia = <IProvincia>null;
  localidadSelected: ILocalidad = <ILocalidad>null;
  cuadranteSelected: ICuadrante = <ICuadrante>null;
  barrioSelected: IBarrio = <IBarrio>null;
  // calleSelected: ICalleBarrio = <ICalleBarrio>null;

  loadingLocal = false;
  loadingCuadrante = false;
  loadingBarrio = false;
  loadingHojas = false;
  ruta: SafeResourceUrl;
  // totalItems: number = 0;
  // callesFilrados: any;
  // newCalle = false;


  constructor(private _localidadService: LocalidadService,
    private _provService: ProvinciaService,
    private _notiService: NotificationService,
    private _cuadraService: CuadranteService,
    private _barrioService: BarrioService,
    private _hrService: HojaRutaService,
    private domSanitizer: DomSanitizer) { }


  ngOnInit() {
    this.loadProvincias();
    // this._subService.on('cambio').subscribe(() => this.onSelect());
  }

  private loadProvincias() {

    this._provService.getAll()
      .subscribe((data: IProvincia[]) => {
        this.provincias = data;
      },
      error => {
        this._notiService.printErrorMessage('Error al Cargar Provincias' + error);
      });
  }

  public onSelectProv(valor: IProvincia) {

    this.provinciaSelected = valor;
    this.loadingLocal = false;

    if (this.localidadSelected) {
      this.cleanLocalidades();
      this.cleanCuadrantes();
      this.cleanBarrios();
      // this.cleanCalles();
    }

    this._localidadService.getByIdProvincia(valor.IdProvincia)
      .subscribe((data: ILocalidad[]) => {
        this.localidades = data;
        this.loadingLocal = true;
      },
      error => {
        this._notiService.printErrorMessage('Error al Cargar Localidades' + error);
      });
  }

  onSelectLocal(valor: ILocalidad) {
    this.localidadSelected = valor;
    if (this.cuadranteSelected) {
      this.cleanCuadrantes();
      this.cleanBarrios();
      // this.cleanCalles();
    }

    this._cuadraService.getByIdLocalidad(valor.IdLocalidad)
      .subscribe((data: ICuadrante[]) => {
        this.cuadrantes = data;
        this.loadingCuadrante = true;
      }, error => {
        this._notiService.printErrorMessage('Error al Cargar el Cuandrante' + error);
      });

  }

  onSelectCuadrante(valor: ICuadrante) {

    this.cuadranteSelected = valor;
    if (this.barrioSelected) {
      this.cleanBarrios();
      // this.cleanCalles();
      // this.cargarTablaFiltro();
    }

    this._barrioService.getByIdCuadrante(valor.IdCuadrante)
      .subscribe((data: IBarrio[]) => {
        this.barrios = data;
        this.loadingBarrio = true;
      }, error => {
        this._notiService.printErrorMessage('Error al Cargar el Barrio' + error);
      });
  }

  onSelectBarrio(valor: IBarrio) {
    this.barrioSelected = valor;
    let rutaaux = ``;
    this.ruta = this.domSanitizer.bypassSecurityTrustResourceUrl(rutaaux);
    this.loadingHojas= false;
    // console.log("BARRIO::::" + JSON.stringify(this.barrioSelected));
    //    this._calleService.getByIdBarrio(valor.IdBarrio)
    //      .subscribe((data: ICalleBarrio[]) => {
    //        this.calles = data;
    //        this.cargarTablaFiltro();
    //      }, error => {
    //        this._notiService.printErrorMessage('Error al Cargar la Calle' + error);
    //      })
  }

  public generarHojas() {
    let rutaaux = `http://localhost/ighor_api/public/hojaruta/${this.barrioSelected.IdBarrio}`;
    this.ruta = this.domSanitizer.bypassSecurityTrustResourceUrl(rutaaux);
    this.loadingHojas = true;

    // console.log("BARRIO :" + JSON.stringify(this.barrioSelected));
    //
    // this._hrService.getByIdBarrio(this.barrioSelected.IdBarrio)
    //   .subscribe((data) => {
    //     console.log("DATA: " + JSON.stringify(data));
    //     this.loadingHojas = true;
    //
    //   }, error => {
    //     this._notiService.printErrorMessage('Error al Generar las Hojas de Rutas' + error)
    //   })
  }



  // public deleteCalle(calleParam: ICalleBarrio) {
  //   this._notiService.openConfirmationDialog('Seguro que desea ELIMINAR esta Calle ?' + calleParam.calle.nombre,
  //     () => {
  //       this._calleService.remove(calleParam.idCalleBarrio).subscribe(() => {
  //         this.calles.splice(this.calles.indexOf(calleParam), 1);
  //         this.cargarTablaFiltro();
  //         this._notiService.printSuccessMessage(calleParam.calle.nombre + ' ha sido eliminada!');
  //       })
  //     });
  // }



  // private saveCalle() {
  //
  //   this._calleService.save(this.calleSelected)
  //     .subscribe((data) => {
  //       if (data && (this.calleSelected.idCalleBarrio == data.calle.idCalleBarrio)) {
  //         this.calles.push(data);
  //       }
  //       // this.childModal.hide();
  //       this._notiService.printSuccessMessage('Calle ' + this.calleSelected.calle.nombre + ' ha sido creada/actualizada.');
  //     },
  //     error => {
  //       this._notiService.printErrorMessage('Fallo al crear/actualizar la calle. ' + error);
  //     });
  //
  //     this.cargarTablaFiltro();
  //
  // }


  // public addCalle() {
  //   this.calleSelected = {
  //     idCalleBarrio: null,
  //     altura_desde: null,
  //     altura_hasta: null,
  //     referencia: "",
  //     plano: "",
  //     ubicacion: "",
  //     noNomenclado: 0,
  //     tipo_numeracion: 0,
  //     barrio: this.barrioSelected,
  //     calle: {
  //       idCalle: null,
  //       nombre: ""
  //     }
  //   };
  //   this.newCalle = true;
  //   this.childModal.config.backdrop = false;
  //   this.childModal.show();
  // }
  //
  // public updateCalle(item: ICalleBarrio) {
  //   this.calleSelected = item;
  //   this.childModal.config.backdrop = false;
  //   this.childModal.show();
  // }
  //
  // public onEditClosed() {
  //   this.childModal.hide();
  //   this.newCalle = false;
  //   // this.onSelectLocal();
  //   // this.loadProvincias();
  // }
  //
  //
  // public onEditSaved(calleParam: ICalleBarrio) {
  //   this.calleSelected = calleParam;
  //   console.log("SUBMITED; LISTO PARA GUARDAR" + JSON.stringify(this.calleSelected));
  //   this.saveCalle();
  //   this.childModal.hide();
  // }
  //
  //
  //
  // public filtrarTabla(valor: string) {
  //   if (!valor) {
  //     this.cargarTablaFiltro();
  //   }
  //   console.log("filtrandoooooo");
  //   console.log("calles []:" + JSON.stringify(this.calles));
  //   valor = valor.toLowerCase();
  //   this.callesFilrados = this.calles.filter(d =>
  //     d.calle.nombre.toLowerCase().indexOf(valor) >= 0);
  //   this.totalItems = this.callesFilrados.length;
  // }
  //
  // private cargarTablaFiltro() {
  //   this.callesFilrados = this.calles;
  //   console.log(this.callesFilrados);
  //   this.totalItems = this.callesFilrados.length;
  // }

  private cleanLocalidades() {
    this.localidades = [];
    this.localidadSelected = null;
    this.loadingLocal = false;
  }

  private cleanCuadrantes() {
    this.cuadrantes = [];
    this.cuadranteSelected = null;
    this.loadingCuadrante = false;
  }

  private cleanBarrios() {
    this.barrios = [];
    this.barrioSelected = null;
    this.loadingBarrio = false;
  }
  //
  // private cleanCalles() {
  //   this.calles = [];
  //   this.calleSelected = null;
  // }

}
