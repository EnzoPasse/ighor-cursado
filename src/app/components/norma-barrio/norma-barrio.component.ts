//angular
import { Component, OnInit } from '@angular/core';

//interfaces
import { IProvincia, ILocalidad, ICuadrante, IBarrio } from './../shared/interfaces/interfaces';

//services
import {BarrioService, CuadranteService, LocalidadService, ProvinciaService} from './../../services/index-service';

//utilidades
import { NotificationService } from './../../services/util/index-util-service';



import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-norma-barrio',
  templateUrl: './norma-barrio.component.html',
  styles: []
})
export class NormaBarrioComponent implements OnInit {

  //provincias : IProvincia[]=[];
  localidades: ILocalidad[] = [];
  provincias: IProvincia[] = [];
  cuadrantes: ICuadrante[] = [];
  barrios: IBarrio[] = [];

  currentProvincia: IProvincia = <IProvincia>null; //{}
  currentLocalidad: ILocalidad = <ILocalidad>null; //{}
  currentCuadrante: ICuadrante = <ICuadrante>null; //{}
  currentBarrio: IBarrio = <IBarrio>null;

    localidadesOK = false;
    isOpen=true;


  constructor(private _ps: ProvinciaService,
    private _ls: LocalidadService,
    private _notiService: NotificationService,
    private _cs: CuadranteService,
    private _bs: BarrioService) { }


  ngOnInit() {

    this._ps.getAll()
      .subscribe((data: IProvincia[]) => {
        this.provincias = data;
      }, error => {
          this._notiService.printErrorMessage('Error al Cargar la Provincias' + error);
      });

      console.log("LOCALIDAD_ OK: " + this.localidadesOK);
  }


  extrarData(data: any): Array<string> {
    let vectorrr = new Array<string>();
    if (data) {
      for (let i of data) {
        vectorrr.push(i.nombre);
      }
    }
    return vectorrr;
  }


  provChange(valor: IProvincia) {
    this.currentProvincia = valor;
    console.log("Provincia selected: " + JSON.stringify(this.currentProvincia));
    this.localidadesOK= false;
    if (this.currentLocalidad) {
      this.cleanLocalidades();
      this.cleanCuadrantes();
      this.cleanBarrios();
    }

    this._ls.getByIdProvincia(valor.IdProvincia)
      .subscribe((data: ILocalidad[]) => {
        this.localidades = data;
        this.localidadesOK= true;
      }, error => {
        this._notiService.printErrorMessage('Error al Cargar la Localidades' + error);
      });
  }

  localChange(valor: ILocalidad) {

    this.currentLocalidad = valor;
    console.log("Localidad selected: " + JSON.stringify(this.currentLocalidad));

    if (this.currentCuadrante) {
      this.cleanCuadrantes();
      this.cleanBarrios();
    }

    this._cs.getByIdLocalidad(valor.IdLocalidad)
      .subscribe((data: ICuadrante[]) => {
        this.cuadrantes = data;
        console.log("CUADRANTE SUBS:" + this.cuadrantes);
      }, error => {
        this._notiService.printErrorMessage('Error al Cargar el Cuandrante' + error);
      });
  }

  cuadraChange(valor: ICuadrante) {
    this.currentCuadrante = valor;
    console.log("Cuadrante selected: " + JSON.stringify(this.currentCuadrante));

 if(this.currentBarrio){
   this.cleanBarrios();
 }
    this._bs.getByIdCuadrante(valor.IdCuadrante)
         .subscribe((data : IBarrio [])=> {
          this.barrios= data;
          console.log("BARRIOS SUBS:" + this.barrios);
         }, error=>{
           this._notiService.printErrorMessage('Error al Cargar el Barrio' + error);
        });
  }

  barrioChange(valor: IBarrio) {
    this.currentBarrio = valor;
    console.log("Barrio selected: " + JSON.stringify(this.currentBarrio));

  }

  cleanLocalidades() {
    this.localidades = [];
    this.currentLocalidad = null;
    this.localidadesOK = false;
  }

  cleanCuadrantes() {
    this.cuadrantes = [];
    this.currentCuadrante = null;
  }

  cleanBarrios(){
    this.barrios =[];
    this.currentBarrio = null;
  }
}
