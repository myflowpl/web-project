import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListPage } from './song-list/song-list.page';
import { SongEditPage } from './song-list/song-edit/song-edit.page';
import { AuthStore } from '../auth/auth.store';
import { SongListNoUserPage } from './song-list-no-user/song-list-no-user.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: SongListNoUserPage,
    canMatch: [
      () => !inject(AuthStore).isAuthorized
    ]
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
        canDeactivate: [
          (page: SongEditPage) => page.canDeactivate()
        ]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
