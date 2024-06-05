import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlite]',
  standalone: true
})
export class HighliteDirective {

  @HostBinding('style.text-decoration')
  decoration = '';

  @HostListener('mouseover')
  mouseOver() {
    this.decoration = 'underline'
  }

  @HostListener('mouseout')
  mouseOut() {
    this.decoration = ''
  }

}
