import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { QuotesPage } from './quotes/quotes.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'quotes',
    component: QuotesPage,
  },
  {
    path: 'songs',
    loadChildren: () => import('./songs/songs.module').then(module => module.SongsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
