import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageBaseUrl'
})
export class ImageBaseUrlPipe implements PipeTransform {

  transform(id: number, ...args: unknown[]): string {
    return `https://randomuser.me/api/portraits/thumb/men/${id}.jpg`;
  }

}
