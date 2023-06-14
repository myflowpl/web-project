import { Component, Injectable, inject } from '@angular/core';
import { User } from 'src/app/api/api.model';
import { AuthStore } from '../auth.store';
import { map, of, share, switchMap, take } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({ providedIn: 'root'})
export class LoginDialog {

  private authStore = inject(AuthStore);
  private dialog = inject(MatDialog);

  open$ = this.authStore.user$.pipe(
    switchMap((user) => {

      if(user) {
        return of(user);
      }
      const dialogRef = this.dialog.open(LoginDialogComponent, { width: '400px'});

      return dialogRef.afterClosed();
    }),
    share(),
    take(1),
  );

  canActivate$ = this.open$.pipe(
    map(user => !!user),
  )
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  dialogRef = inject(MatDialogRef);

  handleSuccess(user: User) {
    this.dialogRef.close(user);
  }
}
