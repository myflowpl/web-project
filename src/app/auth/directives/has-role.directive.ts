import {
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { Role } from '../../api/api.model';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit, OnDestroy {
  templateRef = inject(TemplateRef);
  containerRef = inject(ViewContainerRef);
  authService = inject(AuthService);
  sub = new Subscription();

  role$ = new BehaviorSubject<Role | null>(null);

  @Input()
  set appHasRole(role: Role | undefined | string | null) {
    this.role$.next(role as Role);
  }

  ngOnInit(): void {
    // const flag$: Observable<boolean> = this.authService.user$.pipe(
    //   map(user => !!user),
    // );

    const flag$: Observable<boolean> = combineLatest([
      this.authService.user$,
      this.role$,
    ]).pipe(
      map(([user, role]) => {
        if (!user) {
          return false;
        }
        if (!role) {
          return true;
        }
        return user.role === role;
      })
    );

    this.sub = flag$.pipe(distinctUntilChanged()).subscribe((flag) => {
      if (flag) {
        this.containerRef.createEmbeddedView(this.templateRef);
      } else {
        this.containerRef.clear();
      }
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
