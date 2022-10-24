import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { UserListPage } from './pages/user-list/user-list.page';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    UserDetailsPage,
    UserListPage
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatListModule,
  ]
})
export class UsersModule { }
