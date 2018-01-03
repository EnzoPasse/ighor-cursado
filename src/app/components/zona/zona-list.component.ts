//angular
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ViewContainerRef } from '@angular/core';
//rxjs
import { Subscription } from 'rxjs/Subscription';
//Servicios - utilidades

import { SubService, NotificationService } from './../../services/util/index-util-service';
import { ProvinciaService, LocalidadService, CuadranteService } from './../../services/index-service';
//modelo
import { IProvincia, ILocalidad, ICuadrante } from './../shared/interfaces/interfaces';
//form modal
import { ModalDirective, ModalModule } from 'ng2-bootstrap';

@Component({
  selector: 'app-zona',
  templateUrl: './zona-list.component.html',
  styles: []
})
export class ZonaListComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;
  localidades: ILocalidad[] = [];
  provincias: IProvincia[] = [];
  cuadrantes: ICuadrante[] = [];
  provinciaSelected: IProvincia = <IProvincia>null;
  localidadSelected: ILocalidad = <ILocalidad>null;
  cuadranteSelected: ICuadrante = <ICuadrante>null;

  loadingLocal = false;
  totalItems: number = 0;
  sectoresFilrados: any;
  newCuadrante = false;

  constructor(private _localidadService: LocalidadService,
    private _provService: ProvinciaService,
    private _notiService: NotificationService,
    private _cuadraService: CuadranteService,
    private _subService: SubService) { }


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
    console.log("Provincia selected: " + JSON.stringify(this.provinciaSelected));
    this.loadingLocal = false;

    if (this.localidadSelected) {
      this.cleanLocalidades();
      this.cleanCuadrantes();
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

  public onSelectLocal(valor: ILocalidad) {
    this.localidadSelected = valor;
    // if (this.cuadranteSelected) {
    //   this.cleanCuadrantes();
    // }

    this._cuadraService.getByIdLocalidad(valor.IdLocalidad)
      .subscribe((data: ICuadrante[]) => {
        this.cuadrantes = data;
        this.totalItems = data.length;
      }, error => {
        this._notiService.printErrorMessage('Error al Cargar el Cuandrante' + error);
      });

  }




  public deleteCuadrante(cuadranteParam: ICuadrante) {
    this._notiService.openConfirmationDialog('Seguro que desea ELIMINAR este Cuandrante ?' + cuadranteParam.nombre,
      () => {
        this._cuadraService.remove(cuadranteParam.IdCuadrante).subscribe(() => {
          this.cuadrantes.splice(this.cuadrantes.indexOf(cuadranteParam), 1);
          this.totalItems = this.totalItems - 1;
          // this.cargarTablaFiltro();
          this._notiService.printSuccessMessage(cuadranteParam.nombre + ' ha sido eliminada!');
        })
      });
  }



  private saveCuadrante() {
    if (!this.cuadranteSelected.IdCuadrante) {
      //CREANDO
      this._cuadraService.save(this.cuadranteSelected)
        .subscribe((data) => {
          this.cuadrantes.push(data);
          this.totalItems = this.totalItems + 1;
          this.childModal.hide();
          this._notiService.printSuccessMessage('Localidad ' + this.cuadranteSelected.nombre + ' ha sido creada.');
        },
        error => {
          this._notiService.printErrorMessage('Fallo al crear la Localidad. ' + error);
        });

    } else {
      //ACTUALIZANDO
      this._cuadraService.update(this.cuadranteSelected)
        .subscribe(() => {
          this._notiService.printSuccessMessage('Localidad ' + this.cuadranteSelected.nombre + ' ha sido actualizada.');
        },
        error => {
          this._notiService.printErrorMessage('Fallo al actualizar la Localidad.' + error);
        });
    }

    // this.cargarTablaFiltro()
  }



  public addCuadrante() {
    this.cuadranteSelected = {
      IdCuadrante: null,
      nombre: "",
      IdLocalidad: this.localidadSelected.IdLocalidad,
      localidad: this.localidadSelected
    };
    this.newCuadrante = true;
    this.childModal.config.backdrop = false;
    this.childModal.show();
  }



  public updateCuadrante(item: ICuadrante) {
    this.cuadranteSelected = item;
    this.childModal.config.backdrop = false;
    this.childModal.show();
  }

  public onEditClosed() {
    this.childModal.hide();
    // this.onSelectLocal();
    // this.loadProvincias();
  }


  public onEditSaved(cuadranteParam: ICuadrante) {
    this.cuadranteSelected = cuadranteParam;
    this.saveCuadrante();
    this.childModal.hide();
  }


  public filtrarTabla(valor: string) {
    if (!valor) {
      this.cargarTablaFiltro();
    }
    valor = valor.toLowerCase();
    this.sectoresFilrados = this.cuadrantes.filter(d =>
      d.nombre.toLowerCase().indexOf(valor) >= 0);
    this.totalItems = this.sectoresFilrados.length;
  }

  private cargarTablaFiltro() {
    this.sectoresFilrados = this.cuadrantes;
  }

  private cleanLocalidades() {
    this.localidades = [];
    this.localidadSelected = null;
    this.loadingLocal = false;
  }

  private cleanCuadrantes() {
    this.cuadrantes = [];
    this.cuadranteSelected = null;
  }
}
