import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpPage } from './auth/pages/sign-up/sign-up.page';
import { ContactCreatePage } from './home/pages/contact-create/contact-create.page';
import { ContactDetailsPage } from './home/pages/contact-details/contact-details.page';
import { ContactPage } from './home/pages/contact/contact.page';
import { HomePage } from './home/pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'signup',
    component: SignUpPage
  },
  {
    path: 'contact',
    component: ContactPage,
    children: [{
      path: 'create',
      component: ContactCreatePage
    }, {
      path: ':id',
      component: ContactDetailsPage,
      data: {}
    }]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
