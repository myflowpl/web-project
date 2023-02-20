import { Directive, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { LayoutService } from './layout.service';

@Directive({
  selector: '[appTopOutlet]'
})
export class TopOutletDirective implements OnDestroy {

  layoutService = inject(LayoutService);

  viewContainerRef = inject(ViewContainerRef);

  sub = this.layoutService.top$.subscribe(
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
