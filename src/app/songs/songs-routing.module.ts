import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListPage } from './song-list/song-list.page';
import { SongEditPage } from './song-list/song-edit/song-edit.page';
import { AuthStore } from '../auth/auth.store';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: SongListPage,
    canActivate: [
      () => inject(AuthStore).isAuthorized
    ],
    children: [
      {
        path: ':id',
        component: SongEditPage,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
