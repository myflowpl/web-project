import { Component, effect, inject } from '@angular/core';
import { injectParamAsNumber } from '../../utils/signal.utils';
import { SongsStore } from './songs.store';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { injectSongFormDialog } from './song-form/song-form.dialog';
import { Song } from '../../api/api.model';

@Component({
  selector: 'app-songs',
  imports: [
    MatProgressBarModule,
    MatPaginatorModule,

  ],
  templateUrl: './songs.page.html',
  styleUrl: './songs.page.scss',
  providers: [ 
    SongsStore,
  ],
})
export class SongsPage {

  artistId = injectParamAsNumber('id');

  store = inject(SongsStore);

  songFormDialog = injectSongFormDialog();

  constructor() {
    // this.store.loadSongsByArtistId(this.artistId);

    this.store.connectArtistId(this.artistId);

    // effect(() => {
    //   this.store.setArtistId(this.artistId());
    // })

    this.handleCreate();
  }

  handleCreate() {
    this.songFormDialog.create(this.artistId()).subscribe(
      (song) => console.log('CREATE END', song)
    )
  }

  handleEdit(song: Song) {
    this.songFormDialog.edit(song).subscribe(
      (song) => console.log('EDIT END', song)
    )
  }
}
