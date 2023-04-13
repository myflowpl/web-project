import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { musicRoutes } from './music.routes';
import { ArtistsPage } from './artists/artists.page';
import { SongsPage } from './songs/songs.page';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(musicRoutes)],
  declarations: [ArtistsPage, SongsPage],
})
export class MusicModule {}
