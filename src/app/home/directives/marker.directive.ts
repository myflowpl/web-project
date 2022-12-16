import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appMarker]',
})
export class MarkerDirective implements OnInit, OnDestroy, OnChanges {
  el = inject(ElementRef);
  renderer = inject(Renderer2);

  constructor() {
    // console.log('DIR CONSTRUCTOR', this.el)
    // this.el.nativeElement.addEventListener('click', () => console.log('CLICk'))
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes)
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

    this.renderer.setStyle(
      this.el.nativeElement,
      'font-weight',
      this.fontWeight
    );
  }

  @HostListener('mouseout')
  mouseOut(e: HTMLElement) {
    this.backgroundColor = '';

    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '');
  }

  @HostListener('click', ['$event.target'])
  onClick(e: HTMLElement) {
    console.log('host click', e);
  }
}
