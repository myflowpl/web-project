import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostBinding('style.color')
  color = 'red'

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  @HostListener('mouseenter')
  mouseenter() {
    this.color = 'green';

    this.renderer.setStyle(
      this.el.nativeElement,
      "backgroundColor",
      "yellow"
    );
  }

  @HostListener('mouseout')
  mouseout() {
    this.color = 'red';

    this.renderer.setStyle(
      this.el.nativeElement,
      "backgroundColor",
      "transparent"
    );
  }


}
