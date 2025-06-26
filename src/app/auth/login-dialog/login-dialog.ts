import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form';
import { User } from '@web/api-client';

interface LoginData {
  message?: string;
}


export function injectLoginDialog() {

  const dialog = inject(MatDialog);

  return {
    open(message?: string) {
      const dialogRef = dialog.open<LoginDialog, LoginData, User>(
        LoginDialog, {
          data: { message },
      });

      return dialogRef.afterClosed()
    },
  }
}

@Component({
  selector: 'app-login-dialog',
  imports: [LoginFormComponent, MatDialogContent, MatDialogTitle],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.scss'
})
export class LoginDialog {

  data = inject<LoginData>(MAT_DIALOG_DATA);
  dialogRef = inject<MatDialogRef<User>>(MatDialogRef);

  handleLogin(user: User) {
    this.dialogRef.close(user);
  }
}
