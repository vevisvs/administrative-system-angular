import { Pipe, PipeTransform } from '@angular/core';
import { Users } from 'src/app/board/pages/users/models/users';

@Pipe({
  name: 'fulldata'
})
export class FulldataPipe implements PipeTransform {

  transform(value: Users, ...args: unknown[]): unknown {
    return `${value.name} ${value.lastname}`;
  }

}
