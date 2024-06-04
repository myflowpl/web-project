import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPage } from './contact.page';
import { ContactAdminPage } from './contact-admin/contact-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ContactPage,
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
