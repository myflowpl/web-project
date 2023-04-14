import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { musicRoutes } from './music.routes';
import { ArtistsPage } from './artists/artists.page';
import { SongsPage } from './songs/songs.page';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StoreDirective } from './store.directive';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(musicRoutes),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  declarations: [ArtistsPage, SongsPage, StoreDirective],
})
export class MusicModule {}
