import { computed, Directive, effect, inject, input, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { ProfileStore } from './profile.store';

@Directive({
  selector: '[libHasRole]',
  standalone: true,
})
export class HasRoleDirective {

  libHasRole = input();

  templateRef = inject(TemplateRef);
  containerRef = inject(ViewContainerRef);

  profileStore = inject(ProfileStore);

  isVisible = computed(() => !!this.profileStore.user());

  constructor() {

    effect(() => {

      if(this.isVisible()) {
        this.containerRef.createEmbeddedView(this.templateRef);
      } else {
        this.containerRef.clear();
      }
    });
  }
}
