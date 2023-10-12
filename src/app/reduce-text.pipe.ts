import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceText'
})
export class ReduceTextPipe implements PipeTransform {

  transform(value: string, ...args: number[]): unknown {
    return value.slice(args[0]);
  }

}
