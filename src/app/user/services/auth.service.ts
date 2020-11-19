import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { share, switchMap, take } from 'rxjs/operators';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../dialogs/auth/auth.dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginDialog$ = this.userService.user$.pipe(
    switchMap((user) => {
      if(user) {
        return of(user);
      }
      const dialogRef = this.dialog.open(AuthDialog, {
        // height: "400px",
        width: "400px"
      })

      return dialogRef.afterClosed()
    }),
    share(),
    take(1),
  );

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) { }
}
