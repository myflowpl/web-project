import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'music',
    loadChildren: () => import('./music/music.module').then(m => m.MusicModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: environment.production})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
