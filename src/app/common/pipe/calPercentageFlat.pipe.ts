import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calPercentageFlat'
})
export class CalPercentageFlatPipe implements PipeTransform {

  transform(value: number, args: any[]): any {
    // Parentage
    if (args[1] === 'P') {
      const parentage = Math.round(((args[0] / 100) * value));
      return (value - parentage);
    } else {
      return (value - args[0]);
    }
  }
}
