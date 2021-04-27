import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MatDialog } from "@angular/material/dialog";
import { share, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { SignInDialog } from '../dialogs/sign-in/sign-in.dialog';
import { Profile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  dialog$ = this.authService.profile$.pipe(
    switchMap(profile => {
      if(profile) {
        return of(profile);
      }

      const dialogRef = this.dialog.open<SignInDialog, any, Profile>(SignInDialog, {
        width: '600px',
        height: '400px',
        disableClose: true,
      })
      return dialogRef.afterClosed()
    }),
    share(),
    take(1)
  )

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }
}
