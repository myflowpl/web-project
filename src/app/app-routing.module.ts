import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginPage } from './auth/pages/login/login.page';
import { RegisterPage } from './auth/pages/register/register.page';
import { ContactPage } from './home/pages/contact/contact.page';
import { HomeUserPage } from './home/pages/home-user/home-user.page';
import { HomePage } from './home/pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeUserPage,
    canMatch: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomePage,
    canDeactivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactPage,
    canActivate: [AuthGuard],
    data: {
      unauthorizedUrl: '/',
    },
    children: [],
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'artists',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./artists/artists.module').then((m) => m.ArtistsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
