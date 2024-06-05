import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { User } from '../../api/api.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    LoginFormComponent,
  ],
  templateUrl: './login.dialog.html',
  styleUrl: './login.dialog.scss'
})
export class LoginDialog {

  dialogRef = inject(MatDialogRef)

  onClose(user: User) {
    this.dialogRef.close(user);
  }
}
