import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  private sub: Subscription | undefined;

  private role$$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) { }

  @Input()
  set appHasRole(role: string | undefined) {
    this.role$$.next(role);
  }

  ngOnInit(): void {

    const condition$: Observable<boolean> = combineLatest([
      this.authService.profile$.pipe(map(profile => profile?.user)),
      this.role$$,
    ]).pipe(
      map(([user, role]) => {

        if(!user) {
          return false;
        }

        if(!role) {
          return true;
        }

        return user?.role !== role;

        // return !role || user?.role === role;
      }),
      distinctUntilChanged(),
    )

    this.sub = condition$.subscribe(condition => {
      if(condition) {
        // render template to view
        this.viewContainer.createEmbeddedView(this.templateRef);

      } else {
        // remove template from view
        this.viewContainer.clear();

      }
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


  /**
   * wersja pokazujaca i ukrywajaca gdy jestesmy zalogowani lub nie
   */
  ngOnInitSimple(): void {

    const condition$: Observable<boolean> = this.authService.profile$.pipe(
      map(profile => profile?.user),
      map(user => !!user),
      distinctUntilChanged(),
    );

    this.sub = condition$.subscribe(condition => {
      if(condition) {
        // render template to view
        this.viewContainer.createEmbeddedView(this.templateRef);

      } else {
        // remove template from view
        this.viewContainer.clear();

      }
    })
  }
}
