import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { StoreModule } from '@ngrx/store';
import * as fromMusic from './reducers';


@NgModule({
  declarations: [MusicComponent],
  imports: [
    CommonModule,
    MusicRoutingModule,
    StoreModule.forFeature(fromMusic.musicFeatureKey, fromMusic.reducers, { metaReducers: fromMusic.metaReducers })
  ]
})
export class MusicModule { }
