import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { AuthStore } from '../auth/auth.store';
import { Role } from '../api/api.model';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {

  auth = inject(AuthStore);
  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

  appHasRole = input<Role | string>()
  roleConfig = input<any>()

  constructor() {

    effect(() => {

      const user = this.auth.user();
      const role = this.appHasRole();

      if(user && (user.role === role)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }

    });
    
  }
}
