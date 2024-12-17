import { Component, effect, inject } from '@angular/core';
import { injectParamAsNumber } from '../../utils/signal.utils';
import { SongsStore } from './songs.store';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';

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

  constructor() {
    
    // this.store.loadSongsByArtistId(this.artistId);

    this.store.load(this.store.loadParams);

    effect(() => {
      this.store.setArtistId(this.artistId());
    })
  }
}
