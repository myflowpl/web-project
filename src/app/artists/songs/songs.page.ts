import { Component, effect, inject } from '@angular/core';
import { injectParamAsNumber } from '../../utils/signal.utils';
import { SongsStore } from './songs.store';

@Component({
  selector: 'app-songs',
  imports: [],
  templateUrl: './songs.page.html',
  styleUrl: './songs.page.scss',
  providers: [ 
    SongsStore,
  ],
})
export class SongsPage {

  artistId = injectParamAsNumber('id');

  store = inject(SongsStore);

  constructor() {
    
    this.store.loadSongsByArtistId(this.artistId);

    // effect(() => {
    //   this.store.loadSongsByArtistId(this.artistId());
    // })
  }
}
