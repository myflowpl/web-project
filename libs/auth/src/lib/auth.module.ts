import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
  ],
  declarations: [
    LoginPage,
    RegisterPage,
  ],
})
export class AuthModule {}
