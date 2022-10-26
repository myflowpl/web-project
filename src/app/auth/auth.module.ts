import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from './dialogs/login/login.dialog';
import { AuthDirective } from './directives/auth.directive';



@NgModule({
  declarations: [
    LoginDialog,
    AuthDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthDirective,

  ]
})
export class AuthModule { }
