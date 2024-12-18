import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { User } from '../../api/api.model';
import { injectIsPlatformServer } from '../../app.tokens';
import { ProfileStore } from '../profile.store';

export function injectLoginDialog() {

  const dialog = inject(MatDialog);
  const isServer = injectIsPlatformServer();
  const profile = inject(ProfileStore);

  return {
    open(): Observable<User | undefined> {
      const dialogRef = dialog.open(LoginDialog);

      return dialogRef.afterClosed()
    },
    guard() {
      if(isServer) {
        return false;
      }
      if(profile.user()) {
        return true;
      }
      return this.open().pipe(
        map(user => !!user),
      )
    }
  }
}

@Component({
  selector: 'app-login',
  imports: [
    LoginFormComponent,
    MatDialogModule,
  ],
  templateUrl: './login.dialog.html',
  styleUrl: './login.dialog.scss'
})
export class LoginDialog {

  dialogRef = inject(MatDialogRef);

}
