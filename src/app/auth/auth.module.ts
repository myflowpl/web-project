import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './pages/register/register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';



@NgModule({
  declarations: [
    RegisterPage,
    LoginPage,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
