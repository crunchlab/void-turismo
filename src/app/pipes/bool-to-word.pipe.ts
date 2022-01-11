import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToWord'
})
export class BoolToWordPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
