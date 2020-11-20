import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { StoreModule } from '@ngrx/store';
import * as fromMusic from './reducers';
import * as fromSong from './+song/song.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SongEffects } from './+song/song.effects';


@NgModule({
  declarations: [MusicComponent],
  imports: [
    CommonModule,
    MusicRoutingModule,
    StoreModule.forFeature(fromMusic.musicFeatureKey, fromMusic.reducers, { metaReducers: fromMusic.metaReducers }),
    // StoreModule.forFeature(fromSong.songFeatureKey, fromSong.reducer),
    EffectsModule.forFeature([SongEffects])
  ]
})
export class MusicModule { }
