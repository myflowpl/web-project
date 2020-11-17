import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/api/api.model';

@Pipe({
  name: 'contactPhotoUrl'
})
export class ContactPhotoUrlPipe implements PipeTransform {

  transform(value: Contact, ...args: unknown[]): unknown {
    return `https://randomuser.me/api/portraits/men/${value.id}.jpg`;
  }

}
