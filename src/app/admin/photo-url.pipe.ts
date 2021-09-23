import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../api/api.models';

@Pipe({
  name: 'photoUrl'
})
export class PhotoUrlPipe implements PipeTransform {

  constructor(

  ) {}

  transform(value: User, type = 'men', size = 'small'): string {
    return `https://randomuser.me/api/portraits/${type}/${value.id}.jpg`;
  }

}
