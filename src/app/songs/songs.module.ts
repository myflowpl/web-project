import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { SongListPage } from './song-list/song-list.page';
import { SongEditPage } from './song-list/song-edit/song-edit.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SongListPage,
    SongEditPage
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SongsModule { }
