import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { AModule } from '../shared/a/a.module';
import { BModule } from '../shared/b/b.module';
import { AuthModule } from '../auth/auth.module';
// import { UserService } from './services/user.service';


@NgModule({
  declarations: [UserComponent, UserDetailsPage],
  // providers: [UserService],
  imports: [
    CommonModule,
    UserRoutingModule,
    AuthModule,
    AModule,
    BModule,
  ],
  // exports: [UserService]
})
export class UserModule { }
