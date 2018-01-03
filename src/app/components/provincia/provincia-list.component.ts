//angular
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ViewContainerRef } from '@angular/core';
//rxjs
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';
//Servicios - utilidades
// import { SlimLoadingBarService } from 'ng2-slim-loading-bar'
import { NotificationService, SearchService } from './../../services/util/index-util-service';
//core componentes
import { ProvinciaService } from './../../services/provincia.service';
// import { IProvincia } from './../shared/interfaces/interfaces';
import { IProvincia } from './provincia-model';

//modal
import { ModalDirective, ModalModule } from 'ng2-bootstrap';


@Component({
  selector: 'app-provincia',
  templateUrl: './provincia-list.component.html',
  styles: [],
})

export class ProvinciaListComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;

  public provincias: IProvincia[];
  public provincia: IProvincia;
  public provinciasFiltradas: IProvincia[];
  public totalItems: number = 0;
  public newProvincia = false;
  public privatviewContainerRef: any;



  constructor(private _provService: ProvinciaService,
    private _notiService: NotificationService,
    private viewContainerRef: ViewContainerRef,
    private searchService: SearchService) {
    this.privatviewContainerRef = viewContainerRef;
  }


  ngOnInit() {
    this.loadProvincias();
  }



  public loadProvincias() {

    this._provService.getAll()
      .subscribe((data: IProvincia[]) => {
        this.provincias = data;
        this.cargarTablaFiltro();;
        this.totalItems = this.provincias.length;
      },
      error => {
        this._notiService.printErrorMessage('Error al Cargar Provincias' + error);
      });
  }


  public deleteProvincia(provParam: IProvincia) {

    this._notiService.openConfirmationDialog('Seguro que desea ELIMINAR esta provincia ?' + provParam.nombre,
      () => {
        this._provService.remove(provParam.IdProvincia).subscribe(() => {
          this.provincias.splice(this.provincias.indexOf(provParam), 1);
          this.totalItems = this.totalItems - 1 ;
          this.cargarTablaFiltro();
          this._notiService.printSuccessMessage(provParam.nombre + ' ha sido eliminada!');
        })
      });
  }


  private saveProvincia() {
    if (!this.provincia.IdProvincia) {
      this._provService.save(this.provincia)
        .subscribe((data) => {
          this.provincias.push(data);
          this.totalItems = this.totalItems + 1;
          this.childModal.hide();
          this._notiService.printSuccessMessage('Provincia ' + this.provincia.nombre + ' ha sido creada');
        },
        error => {
          this._notiService.printErrorMessage('Fallo al crear la provincia. ' + error);
        });

    } else {

      this._provService.update(this.provincia)
        .subscribe(() => {
          this._notiService.printSuccessMessage('Provincia ' + this.provincia.nombre + ' ha sido actualizada');
        },
        error => {
          this._notiService.printErrorMessage('Fallo al actualizar la provincia. ' + error);
        });
    }

    this.cargarTablaFiltro()
  }


  public addProvincia() {
    this.provincia = {
      IdProvincia: null,
      nombre: ""
    };
    this.newProvincia = true;
    this.childModal.config.backdrop = false;
    this.childModal.show();

  }


  public updateProvincia(item: IProvincia) {
    this.provincia = item;
    this.childModal.config.backdrop = false;
    this.childModal.show();
  }


  public onEditClosed() {
    this.childModal.hide();
    this.loadProvincias();
    this.newProvincia = false;

  }


  public onEditSaved(provinciaParam: IProvincia) {
    this.provincia = provinciaParam;
    this.saveProvincia();
    this.childModal.hide();
  }


  public filtrarTabla(valor: string) {
    if (!valor) {
      this.cargarTablaFiltro();
    }
    valor = valor.toLowerCase();
    this.provinciasFiltradas = this.provincias.filter(d =>
      d.nombre.toLowerCase().indexOf(valor) >= 0);
    this.totalItems = this.provinciasFiltradas.length;
  }

  private cargarTablaFiltro() {
    this.provinciasFiltradas = this.provincias;
  }
}
