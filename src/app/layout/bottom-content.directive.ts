import { Directive, inject, TemplateRef } from '@angular/core';
import { LayoutService } from './layout.service';

@Directive({
  selector: '[appBottomContent]'
})
export class BottomContentDirective {

  layoutService = inject(LayoutService);

  templateRef = inject(TemplateRef);

  ngOnInit() {
    this.layoutService.addBottom(this.templateRef);
  }

  ngOnDestroy(): void {
      this.layoutService.removeBottom(this.templateRef);
  }

}
