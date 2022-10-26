import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, of, share, switchMap, take } from 'rxjs';
import { LoginDialog } from '../dialogs/login/login.dialog';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  dialog$ = this.authService.profile$.pipe(
    switchMap(profile => {
      if(profile) {
        return of(profile);
      }

      const dialogRef = this.dialog.open(LoginDialog, {
        width: '400px',
        disableClose: true,
      });

      return dialogRef.afterClosed()
    }),
    share(),
    take(1)
  );

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) { }
}
