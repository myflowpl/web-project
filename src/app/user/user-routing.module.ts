import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from '../api/api.models';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserDetailsPage } from './pages/user-details/user-details.page';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ADMIN]
    },
    children: [
      {
        path: ':id',
        component: UserDetailsPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
