import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { SignInDialog } from './dialogs/sign-in/sign-in.dialog';
import { AuthDirective } from './directives/auth.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [SignUpPage, SignInDialog, AuthDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  exports: [AuthDirective]
})
export class AuthModule { }
