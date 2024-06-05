import { Injectable, inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, of, share, switchMap, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'
import { LoginDialog } from './login/login.dialog';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authStore = inject(AuthStore);

  dialog = inject(MatDialog);

  loginDialog$ = of(1).pipe(
    map(() => this.authStore.user()),
    switchMap(user => {
      console.log(user);
      if(user) {
        return of(user);
      }

      const dialogRef = this.dialog.open(LoginDialog, {
        width: '600px',
      });

      return dialogRef.afterClosed()
    }),
    share(),
    take(1),
  );
}
