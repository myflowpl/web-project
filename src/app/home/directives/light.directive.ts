import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLight]'
})
export class LightDirective {

  @HostBinding('style.text-decoration')
  decoration = '';

  @HostBinding('style.background-color')
  bgcolor = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  @HostListener('mouseover')
  onMouseover() {
    this.decoration = 'underline';

    // const plus = this.renderer.createText('+')
    // this.renderer.appendChild(this.el.nativeElement, plus)

    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      'yellow'
    );
  }

  @HostListener('mouseout')
  onMouseout() {
    this.decoration = '';

    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      ''
    );
  }

}
