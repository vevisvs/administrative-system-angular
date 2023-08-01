import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | null) {
    const datePipe = new DatePipe("en-ES");
    value = datePipe.transform(value, 'yyyy-MM-dd');
    return value;
  }

}
