import { computed, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ProfileStore } from './profile.store';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  appHasRole = input<string>()

  containerRef = inject(ViewContainerRef);
  templateRef = inject(TemplateRef);
  profile = inject(ProfileStore);

  // todo check role
  flag = computed(() => !!this.profile.user())

  constructor() { 
    effect(() => {
      if(this.flag()) {
        this.containerRef.createEmbeddedView(this.templateRef);
      } else {
        this.containerRef.clear()
      }
    })
  }

}
