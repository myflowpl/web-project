import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProfileStore } from '@asseco/auth';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@asseco/auth').then(m => m.HomePage)
  },
  {
    path: 'auth',
    loadChildren: () => import('@asseco/auth').then(m => m.AuthModule)
  },
  {
    path: 'music',
    loadChildren: () => import('@asseco/music').then(m => m.MusicModule),
    canMatch: [
      () => {
        const isLogged = inject(ProfileStore).isLogged;
        if(isLogged) {
          return true;
        } else {
          inject(Router).navigateByUrl('/auth')
          return false;
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
