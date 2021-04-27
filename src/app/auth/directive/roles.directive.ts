import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../../api/api.models';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appRoles]'
})
export class RolesDirective implements OnInit, OnDestroy {

  hasView = false;
  roles$$ = new BehaviorSubject<Role[]>([])
  module$$ = new BehaviorSubject<string | null>(null)
  sub = new Subscription()

  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<HTMLElement>,
    private authService: AuthService,
  ) {}


  @Input()
  set appRoles(roles: [Role]) {
    this.roles$$.next(roles || []);
  }

  ngOnInit(): void {

    const condition$ = combineLatest([
      this.authService.profile$,
      this.roles$$,
      this.module$$
    ]).pipe(
      map(([profile, roles, module]) => {
        return !!profile; // TODO sprawdzić jeszcze role
      })
    )

    const subscription = condition$.subscribe((condition) => {
      if (!condition && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      } else if (condition && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.template);
        this.hasView = true;
      }
    })
    this.sub.add(subscription);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
