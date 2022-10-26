import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from './dialogs/login/login.dialog';
import { AuthDirective } from './directives/auth.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterPage } from './pages/register/register.page';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from './directives/has-role.directive';


@NgModule({
  declarations: [
    LoginDialog,
    AuthDirective,
    RegisterPage,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    AuthDirective,
    HasRoleDirective,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
})
export class AuthModule { }
