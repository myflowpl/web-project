import { Component, effect, inject, Injector, viewChild } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface Test3DialogData {
  message?: string;
}

export interface Test3DialogResponse {
  message?: string;
}

export function injectTest3Dialog() {
  const matDialog = inject(MatDialog);
  const injector = inject(Injector);

  return {
    open(data: Test3DialogData = {}): Observable<Test3DialogResponse> {
      const dialogRef = matDialog.open(Test3Dialog, {
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

    guard(data: Test3DialogData = {}): Observable<boolean> {
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
export class Test3Dialog {
  data = inject<Test3DialogData>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  constructor() {}

  handleClose() {
    this.dialogRef.close();
  }
}
