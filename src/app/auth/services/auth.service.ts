import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { LoginUserRequestParams, UserApi } from '../../../api-client';
import { Profile } from '../auth.model';

export interface AuthState {
  profile: Profile | null;
}

const initialAuthState: AuthState = {
  profile: null,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ComponentStore<AuthState> {

  private userApi = inject(UserApi);

  public user$ = this.select(state => state.profile?.user || null);

  constructor() {
    super(initialAuthState);
  }

  readonly login = this.effect((credentials$: Observable<LoginUserRequestParams>) => {
    return credentials$.pipe(
      tap({
        next: (v) => console.log('TAP LOGIN', v)
      }),
      switchMap((credentials) => this.userApi.loginUser(credentials).pipe(
        tapResponse(
          res => this.patchState({
            profile: {
              accessToken: '',
              user: {
                username: 'piotr-myflowpl'
              }
            }
          }),
          error => this.patchState({})
        )
      )),
    );
  });

  // login(username = 'test-myflowpl', password = '!@#$') {

    // this.userApi.loginUser({password, username}).subscribe(res => {
    //   console.log(res);
    //   this.profile$$.next({
    //     accessToken: '',
    //     user: {
    //       username: 'piotr-myflowpl'
    //     }
    //   })
    // });

  // }

  logout() {
    // this.profile$$.next(null)
  }
}



// export class AuthService {

//   private userApi = inject(UserApi);

//   private profile$$ = new BehaviorSubject<Profile | null>(null);
//   public profile$ = this.profile$$.asObservable();

//   public user$ = this.profile$$.asObservable().pipe(
//     map(profile => profile?.user || null)
//   );


//   login(username = 'test-myflowpl', password = '!@#$') {

//     this.userApi.loginUser({password, username}).subscribe(res => {
//       console.log(res);
//       this.profile$$.next({
//         accessToken: '',
//         user: {
//           username: 'piotr-myflowpl'
//         }
//       })
//     });

//   }

//   logout() {
//     this.profile$$.next(null)
//   }
// }
