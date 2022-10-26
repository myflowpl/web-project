import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { UserListPage } from './pages/user-list/user-list.page';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserPhotoPipe } from './pipes/user-photo.pipe';
import { UserCreatePage } from './pages/user-create/user-create.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule, MatSelectTrigger} from '@angular/material/select';
import { LoaderComponent } from '../shared/loader/loader.component';

@NgModule({
  declarations: [
    UserDetailsPage,
    UserListPage,
    UserComponent,
    UserFormComponent,
    UserPhotoPipe,
    UserCreatePage
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    LoaderComponent,
  ],
  exports: [UserPhotoPipe],
  providers: [],
})
export class UsersModule { }
