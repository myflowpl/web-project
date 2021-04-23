import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailsPage } from './pages/user-details/user-details.page';


@NgModule({
  declarations: [UserComponent, UserDetailsPage],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
