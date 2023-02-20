import { Directive, inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { LayoutService } from './layout.service';

@Directive({
  selector: '[appTopContent]'
})
export class TopContentDirective implements OnInit, OnDestroy {

  layoutService = inject(LayoutService);

  templateRef = inject(TemplateRef);

  ngOnInit() {
    this.layoutService.addTop(this.templateRef);
  }

  ngOnDestroy(): void {
      this.layoutService.removeTop(this.templateRef);
  }
}
