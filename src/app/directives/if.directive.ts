import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]'
})
export class IfDirective {

  @Input()
  else: TemplateRef<any> | undefined;

  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef)

  @Input()
  set appIf(flag: boolean) {

    this.viewContainerRef.clear();

    if(flag) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else if (this.else) {
      this.viewContainerRef.createEmbeddedView(this.else);
    }
  }

  constructor() {
    console.log('template', this.templateRef);
    console.log('container', this.viewContainerRef);
   }

}
