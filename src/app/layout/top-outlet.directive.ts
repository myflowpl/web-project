import { Directive, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
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
      } else {
        this.viewContainerRef.createComponent(HeaderComponent);
      }
    }
  )

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
