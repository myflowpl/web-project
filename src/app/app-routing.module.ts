import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from './api/api.models';
import { AuthGuard } from './auth/guards/auth.guard';
import { SignUpPage } from './auth/pages/sign-up/sign-up.page';
import { ContactPage } from './home/pages/contact/contact.page';
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
    path: 'sign-up',
    component: SignUpPage,
  },
  {
    path: 'user',
    canLoad: [AuthGuard],
    data: {
      roles: [Role.USER]
    },
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: 'music', loadChildren: () => import('./music/music.module').then(m => m.MusicModule) },
  { path: 'photo', loadChildren: () => import('./photo/photo.module').then(m => m.PhotoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
