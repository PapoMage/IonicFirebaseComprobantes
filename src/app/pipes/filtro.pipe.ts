import { Pipe, PipeTransform } from '@angular/core';
import { Tab1Page } from '../tab1/tab1.page';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(comprobantes: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
