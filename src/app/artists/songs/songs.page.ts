import { Component, inject } from '@angular/core';
import { injectParamAsNumber } from '../../utils/signal.utils';
import { SongsStore } from './songs.store';

@Component({
  selector: 'app-songs',
  imports: [],
  templateUrl: './songs.page.html',
  styleUrl: './songs.page.scss'
})
export class SongsPage {

  artistId = injectParamAsNumber('id');

  store = inject(SongsStore);

  constructor() {
    // this.store.songs()
    // this.store.artistId()
  }
}
