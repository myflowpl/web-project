import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPage } from './contact.page';
import { ContactAdminPage } from './contact-admin/contact-admin.page';
import { LoginService } from '../auth/login.service';
import { map } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: ContactPage,
    canActivate: [
      () => {
        return inject(LoginService).loginDialog$.pipe(
          map(user => !!user)
        );
      }
    ],
  },
  {
    path: 'admin',
    component: ContactAdminPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
