import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  pure: true,
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string, id?: number): unknown {
    return `https://randomuser.me/api/portraits/men/${id}.jpg`;
  }
}
