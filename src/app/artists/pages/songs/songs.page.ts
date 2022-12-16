import { Component, inject } from '@angular/core';
import { ArtistsFacade } from '../../+artists/artists.facade';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage {
  artistsFacade = inject(ArtistsFacade);
}
