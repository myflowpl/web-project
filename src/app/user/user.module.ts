import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthDialog } from './dialogs/auth/auth.dialog';
import { AuthDirective } from './directives/auth.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDirective } from './directives/user.directive';


@NgModule({
  declarations: [AuthDialog, AuthDirective, UserDirective],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
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
    UserDirective,
  ]
})
export class UserModule { }
