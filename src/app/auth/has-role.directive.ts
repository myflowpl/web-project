import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  private authStore = inject(AuthStore);

  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  sub?: Subscription;

  ngOnInit(): void {
      
    this.sub = this.authStore.user$.subscribe(user => {

      if(user) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }

    })
  }

  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }
}
