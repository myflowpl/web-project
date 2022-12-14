import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './pages/register/register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HasRoleDirective } from './directives/has-role.directive';



@NgModule({
  declarations: [
    RegisterPage,
    LoginPage,
    LoginFormComponent,
    HasRoleDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    HasRoleDirective,
  ],
})
export class AuthModule { }
