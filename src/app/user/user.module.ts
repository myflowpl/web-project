import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthDialog } from './dialogs/auth/auth.dialog';
import { AuthDirective } from './directives/auth.directive';


@NgModule({
  declarations: [AuthDialog, AuthDirective],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    AuthDirective,
  ]
})
export class UserModule { }
