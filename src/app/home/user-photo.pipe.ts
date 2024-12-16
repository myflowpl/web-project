import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPhoto'
})
export class UserPhotoPipe implements PipeTransform {

  transform(user: {id: number}, gender: 'women' | 'men'): string {
    return `https://randomuser.me/api/portraits/${gender}/${user.id}.jpg`;
  }

}
