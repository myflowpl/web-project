import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './auth/pages/register/register.page';
import { ContactPage } from './home/pages/contact/contact.page';
import { Error404Page } from './home/pages/error404/error404.page';
import { HomePage } from './home/pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'contact',
    component: ContactPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(module => module.UsersModule)
  },
  {
    path: '**',
    component: Error404Page,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
