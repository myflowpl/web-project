import { Directive, ElementRef, HostBinding, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarker]'
})
export class MarkerDirective {

  el = inject(ElementRef);
  renderer = inject(Renderer2);

  constructor() {
    console.log('DIR CONSTRUCTOR', this.el)
    // this.el.nativeElement.addEventListener('click', () => console.log('CLICk'))
  }

  @Input()
  fontWeight = '';

  @Input('appMarker')
  bgColor = '';

  @HostBinding('class')
  cls = 'p-1 cursor-pointer';

  @HostBinding('style.background-color')
  backgroundColor = '';

  @HostListener('mouseover')
  mouseOver(e: HTMLElement) {
    this.backgroundColor = this.bgColor;

    this.renderer.setStyle(this.el.nativeElement, 'font-weight', this.fontWeight);
  }

  @HostListener('mouseout')
  mouseOut(e: HTMLElement) {
    this.backgroundColor = '';

    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '');
  }

  @HostListener('click', ['$event.target'])
  onClick(e: HTMLElement) {
    console.log('host click', e)
  }

}
