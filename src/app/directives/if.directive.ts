import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]'
})
export class IfDirective {

  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef)

  @Input()
  set appIf(flag: boolean) {

    if(flag) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor() {
    console.log('template', this.templateRef);
    console.log('container', this.viewContainerRef);
   }

}
