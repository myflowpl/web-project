import { Component, computed, effect, inject } from '@angular/core';
import { injectParamAsNumber, injectTitleService } from '@web/utils';
import { ArtistsStore } from '../artists.store';
import { SongsStore } from './songs.store';

@Component({
  selector: 'app-songs',
  imports: [],
  templateUrl: './songs.page.html',
  styleUrl: './songs.page.scss',
  providers: [SongsStore],
})
export class SongsPage {

  artistsId = injectParamAsNumber('artistId', 0);
  artistsStore = inject(ArtistsStore);

  titleService = injectTitleService();

  artist = computed(() => this.artistsStore.artists().find(a => a.id===this.artistsId()));

  songsStore = inject(SongsStore);

  constructor() {

    this.songsStore.setArtistId(this.artistsId);
    
    
    // this.songsStore.loadSongsByArtistId(this.artistsId)
    // effect(() => {
      // this.songsStore.setArtistId(this.artistsId());
      // this.songsStore.loadSongsByArtistId(this.artistsId());
    // });

    effect(() => {
      const name = this.artist()?.name || 'Artists';
      this.titleService.setTitle(name);

    });
    
  }

}
