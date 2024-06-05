import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../api/api.model';

@Pipe({
  name: 'userPhoto',
  standalone: true,
  pure: false,
})
export class UserPhotoPipe implements PipeTransform {

  transform(user: User | undefined | null, ...args: string[]): string {

    if(user) {
        return `https://randomuser.me/api/portraits/men/${user.id}.jpg`
    }
    return `https://randomuser.me/api/portraits/lego/7.jpg`;
  }

}
