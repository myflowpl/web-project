import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { SignInDialog } from './dialogs/sign-in/sign-in.dialog';
import { AuthDirective } from './directives/auth.directive';



@NgModule({
  declarations: [SignUpPage, SignInDialog, AuthDirective],
  imports: [
    CommonModule
  ],
  exports: [AuthDirective]
})
export class AuthModule { }
