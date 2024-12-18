import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { User } from '../../api/api.model';
import { injectIsPlatformServer } from '../../app.tokens';
import { ProfileStore } from '../profile.store';

export function injectLoginDialog() {

  const dialog = inject(MatDialog);
  const isServer = injectIsPlatformServer();
  const profile = inject(ProfileStore);

  return {
    open(message?: string): Observable<User | undefined> {
      const dialogRef = dialog.open(LoginDialog, {
        data: { message }
      });

      return dialogRef.afterClosed()
    },
    guard(message?: string) {
      if(isServer) {
        return false;
      }
      if(profile.user()) {
        return true;
      }
      return this.open(message).pipe(
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

  message = inject(MAT_DIALOG_DATA)?.message;

}
