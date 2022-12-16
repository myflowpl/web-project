import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistListPage } from './pages/artist-list/artist-list.page';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { StoreModule } from '@ngrx/store';
import * as fromArtists from './+artists/artists.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArtistsEffects } from './+artists/artists.effects';
import { SongsPage } from './pages/songs/songs.page';

@NgModule({
  declarations: [ArtistListPage, ImageUrlPipe, SongsPage],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    StoreModule.forFeature(fromArtists.artistsFeatureKey, fromArtists.reducer),
    EffectsModule.forFeature([ArtistsEffects]),
  ],
})
export class ArtistsModule {}
