import { Component, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from '../../../api/api.model';
import {
  EMPTY,
  Observable,
  of,
  share,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthModule } from '../../auth.module';
import { AuthService } from '../../services/auth.service';

export interface LoginDialogData {
  message: string;
}

export interface LoginDialogResponse {
  user: User;
}

@Injectable({ providedIn: 'root' })
export class LoginDialog {
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);

  /**
   * returns user
   * if exists returns immediate
   * if not exists, displays login dialog and after success returns user
   * if no user ??? throw error OR complete with empty
   */
  user$ = this.authService.user$.pipe(
    switchMap((user) => (user ? of(user) : this.open())),
    share(),
    take(1)
  );

  open(data?: LoginDialogData): Observable<User> {
    const dialogRef = this.dialog.open<
      LoginDialogComponent,
      LoginDialogData,
      LoginDialogResponse
    >(LoginDialogComponent, {
      width: '600px',
      disableClose: true,
      data,
    });

    return dialogRef.afterClosed().pipe(
      switchMap((res) =>
        res ? of(res.user) : throwError(() => new Error('Login canceled'))
      )
      // switchMap(res => res ? of(res.user) : EMPTY)
    );
  }

  create(parentEntity: object) {}
  update(entity: object) {}
  delete(id: string) {}
}

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, AuthModule],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  data?: LoginDialogData = inject(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef);

  handleCancel() {
    this.dialogRef.close();
  }
  handleSuccess(user: User) {
    const res: LoginDialogResponse = {
      user,
    };
    this.dialogRef.close(res);
  }
}
