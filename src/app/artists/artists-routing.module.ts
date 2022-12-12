import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistListPage } from './pages/artist-list/artist-list.page';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: ArtistListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule { }
