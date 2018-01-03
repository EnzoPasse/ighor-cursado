//angular
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//modelo
import { ICalleBarrio, ConsultaCalle, Filtro, IListaMal } from './../shared/interfaces/interfaces';
//service
import { NormalizaCalleService } from './../../services/index-service';
//util
import { NotificationService } from './../../services/util/index-util-service';



@Component({
  selector: 'app-criterio-calle',
  templateUrl: './criterio-calle.component.html',
  styles: []
})
export class CriterioCalleComponent implements OnInit, OnChanges {

  // @Input() barrio: IBarrio;
  @Input() calle: ICalleBarrio;

  consulta: ConsultaCalle;
  consultaCargada: ConsultaCalle;

  forma: FormGroup;

  claves: any[] = [
    { id: 1, valor: 'LIKE' },
    { id: 2, valor: 'NOT LIKE' },
    { id: 3, valor: '=' },
    { id: 4, valor: '<>' }
  ];

  tipoFiltro = "";
  listarTodo = false;

  listaMal: IListaMal[];


  //TABLA
  totalItems: number = 0;
  selected = [];
  selectAll = true;

  isOpen = true;

  constructor(private fb: FormBuilder,
    private _nc: NormalizaCalleService,
    private _notiService: NotificationService) {
    this.crearForma();
  }


  ngOnInit() { this.cargarConsulta(); }


  crearForma() {
    this.forma = this.fb.group({
      // all: [false, ,],
      filtro: this.fb.array([])
    });
  }


  get filtro(): FormArray {
    return this.forma.get('filtro') as FormArray;
  }


  initFiltros() {
    return this.fb.group({
      tipo: ['AND', Validators.required],
      openbrackets: [false, ,],
      criterio: ['', Validators.required],
      valor: ['', [Validators.required, Validators.minLength(3)]],
      closebrackets: [false, ,]
    });
  }

  agregarFiltro() {
    // const control = <FormArray>this.forma.controls['filtro'];
    // control.push(this.initFiltros());
    //  this.filtro.push(this.fb.group(new Filtro()));

    this.filtro.push(this.initFiltros());

  }

  removeFiltro(i: number) {
    // const control = <FormArray>this.forma.controls['filtro'];
    // control.removeAt(i);
    this.filtro.removeAt(i);
  }


  cargarConsulta() {
    let clave = this.calle.idCalleBarrio;
    this._nc.getFiltros(clave)
      .subscribe((data: ConsultaCalle) => {
        this.consultaCargada = data;
        this.cargarFiltro(this.consultaCargada.filtro);
        console.log("CONSULTA CARGADAS:::" + JSON.stringify(data));
      }, error => {
        this._notiService.printErrorMessage('Error al cargar los filtros' + error);
      });

  }

  ngOnChanges() {
    this.forma.reset();
    this.cleanTabla();
    this.cargarConsulta();

  }


  cargarFiltro(filtro: Filtro[]) {
    console.log("ENTRO AL ONCHANGE");
    const filtroFG = filtro.map(cri => this.fb.group(cri));
    const filtroFromArray = this.fb.array(filtroFG);
    this.forma.setControl('filtro', filtroFromArray);
    console.log("ARRAYFILTROACARGAR:" + filtroFromArray);
  }


  cleanTabla() {
    this.selected = [];
    this.selectAll = true;
    this.totalItems = 0;
    this.listaMal = null;

  }

  guardarForm() {
    this.consulta = this.preparedConsulta();

    this._nc.getList(this.consulta)
      .subscribe((data: IListaMal[]) => {
        this.listaMal = data;
        this.totalItems = data.length;
      },
      error => {
        this._notiService.printErrorMessage('Error al Listar las Calles' + error);
      });
  }

  preparedConsulta() {
    const formModel = this.forma.value;
    // cargo el FormArray; no se puede hacer variable = forma.filtro;
    const filtroDeepCopy: Filtro[] = formModel.filtro.map(
      (nfiltro: Filtro) => Object.assign({}, nfiltro)
    );
    const saveConsulta: ConsultaCalle = {
      calleConsulta: this.calle.idCalleBarrio,
      //all: formModel.all as boolean,
      all: this.listarTodo as boolean,
      callesMal: this.selected,
      filtro: filtroDeepCopy
    };
    return saveConsulta;
  }


  normalizar() {
    this.consulta = this.preparedConsulta();
    console.log("CONSULTA" + JSON.stringify(this.consulta));

    this._nc.normalizar(this.consulta)
      .subscribe(data => {
        console.log("DATA_RESPONSE::::" + JSON.stringify(data));
        //  this.selected = [];
        this._notiService.printSuccessMessage('Se normalizaron ' + data.cant_filas + ' items!');
      },
      error => {
        this._notiService.printErrorMessage('Fallo al Normalizar. ' + error);
      });
  }



  //chequeables de la tabla ----INICIO-------------------
  checkAll() {
    if (this.selectAll) {
      for (let item of this.listaMal) {
        let idx = this.selected.indexOf(item);
        if (idx < 0) {
          this.selected.push(item.Id);
        }
      }
    } else {
      this.selected = [];
    }
  }

  existe(item) {
    return this.selected.indexOf(item) > -1;
  }

  toggleSelection(item) {
    let idx = this.selected.indexOf(item);
    if (idx > -1) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(item);
    }
    console.log("SELECTED" + JSON.stringify(this.selected));
  }
  //chequeables de la tabla -----FIN----------------
}
