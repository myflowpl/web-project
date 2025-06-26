import { Component, computed, effect, inject } from '@angular/core';
import { injectParamAsNumber, injectTitleService } from '@web/utils';
import { ArtistsStore } from '../artists.store';

@Component({
  selector: 'app-songs',
  imports: [],
  templateUrl: './songs.page.html',
  styleUrl: './songs.page.scss'
})
export class SongsPage {

  artistsId = injectParamAsNumber('artistId', 0);
  artistsStore = inject(ArtistsStore);

  titleService = injectTitleService();

  artist = computed(() => this.artistsStore.artists().find(a => a.id===this.artistsId()));

  constructor() {

    effect(() => {
      const name = this.artist()?.name || 'Artists';
      this.titleService.setTitle(name);

    });
    
  }

}
