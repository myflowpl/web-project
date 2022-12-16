import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './pages/register/register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [RegisterPage, LoginPage, LoginFormComponent, HasRoleDirective],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [HasRoleDirective, LoginFormComponent],
})
export class AuthModule {}
