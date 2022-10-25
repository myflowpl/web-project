import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../api/api.model';

@Pipe({
  name: 'userPhoto'
})
export class UserPhotoPipe implements PipeTransform {

  constructor(

  ) {}

  transform(user: User, size: 'med' | 'thumb' = 'med'): string {
    return `https://randomuser.me/api/portraits/${size}/men/${user.id}.jpg`;
  }

}
