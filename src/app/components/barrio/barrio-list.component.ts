//angular
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ViewContainerRef } from '@angular/core';
// rxjs
import { Subscription } from 'rxjs/Subscription';
//Servicios - utilidades

import { SubService, NotificationService } from './../../services/util/index-util-service';
import { ProvinciaService, LocalidadService, CuadranteService, BarrioService } from './../../services/index-service';
//modelo
import { IProvincia, ILocalidad, ICuadrante, IBarrio } from './../shared/interfaces/interfaces';
//form modal
import { ModalDirective, ModalModule } from 'ng2-bootstrap';

@Component({
  selector: 'app-barrio-list',
  templateUrl: './barrio-list.component.html',
  styles: []
})
export class BarrioListComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;
  localidades: ILocalidad[] = [];
  provincias: IProvincia[] = [];
  cuadrantes: ICuadrante[] = [];
  barrios: IBarrio[] = [];
  provinciaSelected: IProvincia = <IProvincia>null;
  localidadSelected: ILocalidad = <ILocalidad>null;
  cuadranteSelected: ICuadrante = <ICuadrante>null;
  barrioSelected: IBarrio = <IBarrio>null;

  loadingLocal = false;
  loadingCuadrante = false;
  totalItems: number = 0;
  barriosFilrados: any;
  newBarrio = false;

  constructor(private _localidadService: LocalidadService,
    private _provService: ProvinciaService,
    private _notiService: NotificationService,
    private _cuadraService: CuadranteService,
    private _barrioService: BarrioService,
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
      this.cleanBarrios();
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
        this.cargarTablaFiltro()
      }

    this._cuadraService.getByIdLocalidad(valor.IdLocalidad)
      .subscribe((data: ICuadrante[]) => {
        this.cuadrantes = data;
        }, error => {
        this._notiService.printErrorMessage('Error al Cargar el Cuandrante' + error);
      });

  }

 onSelectCuadrante(valor:ICuadrante){

   this.cuadranteSelected = valor;

    this._barrioService.getByIdCuadrante(valor.IdCuadrante)
    .subscribe((data : IBarrio[])=>{
        this.barrios = data;
        // this.totalItems = this.barrios.length;
        this.cargarTablaFiltro();
    }, error => {
      this._notiService.printErrorMessage('Error al Cargar el Barrio' + error);
    });
 }


  public deleteBarrio(barrioParam: IBarrio) {
    this._notiService.openConfirmationDialog('Seguro que desea ELIMINAR este Barrio ?' + barrioParam.nombre,
      () => {
        this._barrioService.remove(barrioParam.IdBarrio).subscribe(() => {
          this.barrios.splice(this.barrios.indexOf(barrioParam), 1);
          this.cargarTablaFiltro();
          this._notiService.printSuccessMessage(barrioParam.nombre + ' ha sido eliminada!');
        })
      });
  }



  private saveBarrio() {
    if (!this.barrioSelected.IdBarrio) {
      //CREANDO
      this._barrioService.save(this.barrioSelected)
        .subscribe((data) => {
          this.barrios.push(data);
          this.cargarTablaFiltro();
          this.childModal.hide();
          this._notiService.printSuccessMessage('Barrio ' + this.barrioSelected.nombre + ' ha sido creada.');
        },
        error => {
          this._notiService.printErrorMessage('Fallo al crear el Barrio. ' + error);
        });

    } else {
      //ACTUALIZANDO
      this._barrioService.update(this.barrioSelected)
        .subscribe(() => {
          this._notiService.printSuccessMessage('Barrio ' + this.barrioSelected.nombre + ' ha sido actualizada.');
        },
        error => {
          this._notiService.printErrorMessage('Fallo al actualizar el Barrio.' + error);
        });
    }

    // this.cargarTablaFiltro()
  }



  public addBarrio() {
    this.barrioSelected = {
      IdBarrio: null,
      IdProvincia: this.provinciaSelected.IdProvincia,
      IdLocalidad: this.localidadSelected.IdLocalidad,
      IdCuadrante: this.cuadranteSelected.IdCuadrante,
      nombre: "",
      CodigoPostal: null,
      cuadrante: this.cuadranteSelected
    };
    this.newBarrio = true;
    this.childModal.config.backdrop = false;
    this.childModal.show();
  }



  public updateBarrio(item: IBarrio) {
    this.barrioSelected = item;
    this.childModal.config.backdrop = false;
    this.childModal.show();
  }

  public onEditClosed() {
    this.childModal.hide();
    this.newBarrio= false;
    // this.onSelectLocal();
    // this.loadProvincias();
  }


  public onEditSaved(barrioParam: IBarrio) {
    this.barrioSelected = barrioParam;
    this.saveBarrio();
    this.childModal.hide();
  }


  public filtrarTabla(valor: string) {
    if (!valor) {
      this.cargarTablaFiltro();
    }
    valor = valor.toLowerCase();
    this.barriosFilrados = this.barrios.filter(d =>
      d.nombre.toLowerCase().indexOf(valor) >= 0);
    this.totalItems = this.barriosFilrados.length;
  }

  private cargarTablaFiltro() {
    this.barriosFilrados = this.barrios;
    this.totalItems = this.barriosFilrados.length;
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

  private cleanBarrios(){
    this.barrios = [];
    this.barrioSelected= null;
  }
}
