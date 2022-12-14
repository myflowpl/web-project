import { Directive, inject, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  templateRef = inject(TemplateRef);
  containerRef = inject(ViewContainerRef);
  authService = inject(AuthService);
  sub = new Subscription();
  ngOnInit(): void {

    const flag$: Observable<boolean> = this.authService.user$.pipe(
      map(user => !!user),
    );

    this.sub = flag$.pipe(
      distinctUntilChanged(),
    ).subscribe(flag => {

      if(flag) {
        this.containerRef.createEmbeddedView(this.templateRef);
      } else {
        this.containerRef.clear();
      }

    });
  }
  ngOnDestroy(): void {

  }
}
