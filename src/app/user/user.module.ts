import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthDialog } from './dialogs/auth/auth.dialog';
import { AuthDirective } from './directives/auth.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [AuthDialog, AuthDirective],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [
    AuthDirective,
  ]
})
export class UserModule { }
