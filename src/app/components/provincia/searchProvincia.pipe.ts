import { Pipe, PipeTransform } from '@angular/core';
import { IProvincia } from './../../components/shared/interfaces/interfaces';

@Pipe({
  name: 'searchProvincia',
  pure: false
})
export class SearchProvinciaPipe implements PipeTransform {

  transform(provincias: IProvincia[], searchText: string): IProvincia[] {

    searchText = searchText.toUpperCase();

    let filteredProvincias: IProvincia[] = new Array<IProvincia>();

    if (provincias != undefined) {
      filteredProvincias = provincias.filter(c => (c.nombre.toUpperCase().indexOf(searchText) != -1));
    }

    return filteredProvincias;
  }
}
