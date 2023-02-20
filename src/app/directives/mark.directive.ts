import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appMark]'
})
export class MarkDirective {

  @HostBinding('style.text-decoration')
  decoration = 'underline'

  @HostBinding('style.background-color')
  bg = ''

  @HostListener('mouseenter')
  enter() {
    console.log('ENTER')
    this.bg = 'red';
  }

  @HostListener('mouseleave')
  leave() {
    console.log('LEAVE')
    this.bg = '';
  }

}
