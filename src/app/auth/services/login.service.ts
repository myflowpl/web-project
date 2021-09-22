import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { User } from '../../api/api.models';
import { SignInDialog } from '../dialogs/sign-in/sign-in.dialog';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginDialog$: Observable<User | undefined> = this.authService.profile$.pipe(
    map(profile => profile?.user),
    switchMap((user) => {
      if(user) {
        return of(user);
      }

      // open login dialog
      const dialogRef = this.dialog.open<SignInDialog, any, User>(SignInDialog, {
        height: '400px',
        width: '600px'
      });

      return dialogRef.afterClosed();
    })
  )

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }
}
