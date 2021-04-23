import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { SignInDialog } from './dialogs/sign-in/sign-in.dialog';
import { AuthDirective } from './directives/auth.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [SignUpPage, SignInDialog, AuthDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [AuthDirective]
})
export class AuthModule { }
