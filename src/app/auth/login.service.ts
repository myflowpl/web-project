import { Injectable, inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, of, share, switchMap, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'
import { LoginDialog } from './login/login.dialog';
import { IS_SERVER } from '../injection.utils';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authStore = inject(AuthStore);
  isServer = inject(IS_SERVER);

  dialog = inject(MatDialog);

  loginDialog$ = toObservable(this.authStore.user).pipe(
    switchMap(user => {
      
      if(user || this.isServer) {
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
