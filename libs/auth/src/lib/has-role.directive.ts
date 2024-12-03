import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ProfileStore } from './profile.store';

@Directive({
  selector: '[libHasRole]',
  standalone: true,
})
export class HasRoleDirective {

  roleName = input();
  libHasRole = input();

  templateRef = inject(TemplateRef);
  containerRef = inject(ViewContainerRef);

  profileStore = inject(ProfileStore);

  constructor() {
    
    effect(() => {

      console.log('PROPS', this.roleName(), this.libHasRole());
      
      if(this.profileStore.user()) {
        this.containerRef.createEmbeddedView(this.templateRef);
      } else {
        this.containerRef.clear();
      }
    });

  }
}
