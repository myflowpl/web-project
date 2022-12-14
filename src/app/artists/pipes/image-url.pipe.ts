import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return 'http://localhost/photos/' + value;
  }

}
