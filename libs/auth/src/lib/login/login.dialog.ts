import { Component, effect, inject, Injector, viewChild } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface LoginDialogData {
  message?: string;
}

export interface LoginDialogResponse {
  message?: string;
}

export function injectLoginDialog() {
  
  const matDialog = inject(MatDialog);
  const injector = inject(Injector);

  return {
    open(data: LoginDialogData = {}): Observable<LoginDialogResponse> {
      const dialogRef = matDialog.open(LoginDialog, {
        injector,
        data,
      });

      return dialogRef
        .afterClosed()
        .pipe(
          switchMap((profile) =>
            profile
              ? of(profile)
              : throwError(() => new Error('Login anulowany'))
          )
        );
    },

    guard(data: LoginDialogData = {}): Observable<boolean> {
      return this.open(data).pipe(
        map((profileStore) => true),
        catchError(() => of(false))
      );
    },
  };
}

@Component({
  selector: 'app-login',
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './login.dialog.html',
  styleUrl: './login.dialog.scss',
})
export class LoginDialog {
  data = inject<LoginDialogData>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  constructor() {}

  handleClose() {
    this.dialogRef.close();
  }
}
