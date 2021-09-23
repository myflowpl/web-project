import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { filter, map, share, switchMap, take } from 'rxjs/operators';
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
      const dialogRef = this.dialog.open(SignInDialog, {
        width: '400px',
        closeOnNavigation: false,
        disableClose: true,
      });

      return dialogRef.afterClosed();
    }),
    share(),
    take(1),
  )

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }
}
