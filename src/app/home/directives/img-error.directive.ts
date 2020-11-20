import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img',
  // host: {
  //   "[src]": "src",
  //   "(error)": "onError()"
  // }
})
export class ImgErrorDirective {

  constructor() { }


  @Input()
  @HostBinding()
  src: string = '';

  @HostListener('error')
  onError() {
    this.src = 'https://randomuser.me/api/portraits/lego/2.jpg';
  }

}
