import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { BehaviorSubject, Subscription, combineLatest, distinctUntilChanged, map } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  private authStore = inject(AuthStore);

  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  sub?: Subscription;

  private role$ = new BehaviorSubject<string | null | undefined>(null);

  @Input()
  set appHasRole(role: string) {
    this.role$.next(role);
  }

  ngOnInit(): void {

    const flag$ = combineLatest([
      this.authStore.user$,
      this.role$,
    ]).pipe(
      map(([user, role]) => {

        if(!user) {
          return false;
        }

        if(!role) {
          return true;
        }

        return user.role === role;
      }),
      distinctUntilChanged(),
    );
      
    this.sub = flag$.subscribe((flag) => {

      if(flag) {
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
