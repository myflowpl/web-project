import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from './dialogs/login/login.dialog';
import { AuthDirective } from './directives/auth.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LoginDialog,
    AuthDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    AuthDirective,

  ]
})
export class AuthModule { }
