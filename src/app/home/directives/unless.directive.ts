import { Directive, Input, OnChanges, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  private hasView = false;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) { }

  @Input()
  set appUnless(flag: boolean) {
    // TODO zaimplementowac this.hasView, tak jak to jest w user.directive.ts
    if(!flag) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear();
    }
  };

}
