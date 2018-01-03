//angular
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ViewContainerRef } from '@angular/core';
//rxjs
import { Subscription } from 'rxjs/Subscription';
//Servicios - utilidades
import { SubService, NotificationService } from './../../services/util/index-util-service';
import { ProvinciaService, LocalidadService } from './../../services/index-service';
//modelo
import { IProvincia, ILocalidad } from './../shared/interfaces/interfaces';
// import { IProvincia } from './../provincia/index-provincia';
//form modal
import { ModalDirective, ModalModule } from 'ng2-bootstrap';


@Component({
  selector: 'app-localidad',
  templateUrl: './localidad-list.component.html',
  styles: [],
})

export class LocalidadListComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;
  localidades: ILocalidad[] = [];
  provincias: IProvincia[] = [];
  provinciaSelected: IProvincia;
  localidadSelected: ILocalidad;

  totalItems: number = 0;
  localFiltradas: any;
  newLocalidad = false;

  constructor(private _localidadService: LocalidadService,
    private _provService: ProvinciaService,
    private _notiService: NotificationService,
    private _subService: SubService) { }


  ngOnInit() {
    this.loadProvincias();
    this._subService.on('cambio').subscribe(() => this.onSelect());
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

  public onSelect() {
    // console.log("ITEM SELECTED:::" + JSON.stringify(this.provinciaSelected));
    // console.log("VALORRRRR: " + this.provinciaSelected.IdProvincia);

    this._localidadService.getByIdProvincia(this.provinciaSelected.IdProvincia)
      .subscribe((data: ILocalidad[]) => {
        this.localidades = data;
        // this.localFiltradas = this.localidades;
        this.cargarTablaFiltro();
        this.totalItems = this.localidades.length;
      },
      error => {
        this._notiService.printErrorMessage('Error al Cargar Localidades' + error);
      });
  }


  public deleteLocalidad(localidadParam: ILocalidad) {

   this._notiService.openConfirmationDialog('Seguro que desea ELIMINAR esta Localidad ?' + localidadParam.nombre,
      () => {
        this._localidadService.remove(localidadParam.IdLocalidad).subscribe(() => {
          this.localidades.splice(this.localidades.indexOf(localidadParam), 1);
          this.totalItems = this.totalItems - 1;
          this.cargarTablaFiltro();
          this._notiService.printSuccessMessage(localidadParam.nombre + ' ha sido eliminada!');
        })
      });
  }



  private saveLocalidad() {
    if (!this.localidadSelected.IdLocalidad) {
       //CREANDO
      this._localidadService.save(this.localidadSelected)
        .subscribe((data) => {
          this.localidades.push(data);
          this.totalItems = this.totalItems + 1;
          this.childModal.hide();
          this._notiService.printSuccessMessage('Localidad ' + this.localidadSelected.nombre + ' ha sido creada.');
        },
        error => {
          this._notiService.printErrorMessage('Fallo al crear la Localidad. ' + error);
        });

    } else {
      //ACTUALIZANDO
      this._localidadService.update(this.localidadSelected)
        .subscribe(() => {
          this._notiService.printSuccessMessage('Localidad ' + this.localidadSelected.nombre + ' ha sido actualizada.');
        },
        error => {
          this._notiService.printErrorMessage('Fallo al actualizar la Localidad.' + error);
        });
    }
    this.cargarTablaFiltro()
  }



  public addLocalidad() {
    this.localidadSelected = {
      IdLocalidad: null,
      CodigoPostal: null,
      nombre: "",
      IdProvincia: this.provinciaSelected.IdProvincia,
      provincia: this.provinciaSelected
    };
    this.newLocalidad = true;
    this.childModal.config.backdrop = false;
    this.childModal.show();
  }



  public updateLocalidad(item: ILocalidad) {
    this.localidadSelected = item;
    this.childModal.config.backdrop = false;
    this.childModal.show();
  }


  onEditClosed() {
    this.childModal.hide();
    this.onSelect();
    this.newLocalidad= false;
    // this.loadProvincias();
  }


  onEditSaved(localidadParam: ILocalidad) {
    this.localidadSelected = localidadParam;
    this.saveLocalidad();
    this.childModal.hide();
  }


  public filtrarTabla(valor: string) {
    if (!valor) {
      this.cargarTablaFiltro();
    }
    valor = valor.toLowerCase();
    this.localFiltradas = this.localidades.filter(d =>
      d.nombre.toLowerCase().indexOf(valor) >= 0);
    this.totalItems = this.localFiltradas.length;
  }

  private cargarTablaFiltro() {
    this.localFiltradas = this.localidades;
  }
}
