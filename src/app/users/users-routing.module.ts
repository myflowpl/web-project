import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserCreatePage } from './pages/user-create/user-create.page';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { UserListPage } from './pages/user-list/user-list.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: UserListPage,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: UserCreatePage,
      },
      {
        path: ':id',
        component: UserDetailsPage,
      },
    ],
  },
];
// costam
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
