import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { QuotesPage } from './quotes/quotes.page';
import { LoginDialog } from './auth/login-dialog/login-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'quotes',
    component: QuotesPage,
    canActivate: [
      () => inject(LoginDialog).canActivate$,
    ],
  },
  {
    path: 'songs',
    loadChildren: () => import('./songs/songs.module').then(module => module.SongsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
