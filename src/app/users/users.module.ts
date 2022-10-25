import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { UserListPage } from './pages/user-list/user-list.page';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    UserDetailsPage,
    UserListPage
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
})
export class UsersModule { }
