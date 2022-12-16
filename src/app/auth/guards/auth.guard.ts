import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginDialog } from '../dialogs/login-dialog/login-dialog.component';
import { AuthService } from '../services/auth.service';

export interface CanDeactivateComponent {
  canDeactivate(): boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard
  implements
    CanActivate,
    CanActivateChild,
    CanDeactivate<unknown>,
    CanLoad,
    CanMatch
{
  authService = inject(AuthService);
  loginDialog = inject(LoginDialog);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // console.log('CAN ACTIVE', route, state)
    return this.loginDialog.user$.pipe(
      map((user) => true),
      catchError((err) =>
        of(
          this.router.parseUrl(
            route.data['unauthorizedUrl']
              ? route.data['unauthorizedUrl']
              : '/login'
          )
        )
      )
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('CAN DEACTIVATE', component, currentRoute, currentState, nextState)
    return component.canDeactivate();
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('CAN MATCH', !!this.authService.user)
    return !!this.authService.user;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('CAN LOAD', route, segments)
    return this.loginDialog.user$.pipe(
      map((user) => true),
      catchError((err) =>
        of(
          this.router.parseUrl(
            route.data && route.data['unauthorizedUrl']
              ? route.data['unauthorizedUrl']
              : '/login'
          )
        )
      )
    );
  }
}
