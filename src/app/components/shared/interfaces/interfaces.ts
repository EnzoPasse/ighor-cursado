
export class ICalle{
idCalle:number;
nombre:string;
}

export class ICalleBarrio {
  idCalleBarrio: number;
  altura_desde:number;
  altura_hasta:number;
  referencia:string;
  plano:string;
  ubicacion:string;
  noNomenclado:number;
  tipo_numeracion:number;
  barrio: IBarrio;
  calle:ICalle;
}

export class IBarrio {
  IdBarrio: number;
  IdProvincia: number;
  IdLocalidad: number;
  IdCuadrante: number;
  nombre: string;
  CodigoPostal: number;
  cuadrante: ICuadrante;
}


export class IListaMal {
  Id: number;
  DescripcionMal: string;
  barrio: string;
}


export class ICuadrante {
  IdCuadrante: number;
  nombre: string;
  IdLocalidad: number;
  localidad: ILocalidad;
}

export class IProvincia {
  IdProvincia: number;
  nombre: string;
}

export class ILocalidad {
  IdLocalidad: number;
  CodigoPostal: number;
  nombre: string;
  IdProvincia: number;
  provincia: IProvincia;
}

export interface Pagination {
  CurrentPage: number;
  ItemsPerPage: number;
  TotalItems: number;
  TotalPages: number;
}

export class ConsultaCalle{
 calleConsulta =0;
 all= false;
 callesMal: number[]=[];
 filtro: Filtro[]=[];
}


export class Consulta {
  barrioConsulta = 0;
  all = false;
  barriosMal: number[] = [];
  filtro: Filtro[] = [];
}

export class Filtro {
  tipo = "";
  openbrackets = false;
  closebrackets = false;
  criterio = "";
  valor = "";
}



export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}

export interface Predicate<T> {
  (item: T): boolean;
}
