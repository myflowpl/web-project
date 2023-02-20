import { Directive, inject, ViewContainerRef } from '@angular/core';
import { LayoutService } from './layout.service';

@Directive({
  selector: '[appBottomOutlet]'
})
export class BottomOutletDirective {

  layoutService = inject(LayoutService);

  viewContainerRef = inject(ViewContainerRef);

  sub = this.layoutService.bottom$.subscribe(
    tpl => {

      this.viewContainerRef.clear();

      if(tpl) {
        this.viewContainerRef.createEmbeddedView(tpl)
      }
    }
  )

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
