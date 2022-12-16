import { ViewEncapsulation } from '@angular/core';
import { Component, inject, OnInit } from '@angular/core';
import { loadArtists } from '../../+artists/artists.actions';
import { ArtistsFacade } from '../../+artists/artists.facade';
import { Artist } from '../../../api/api.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.page.html',
  styleUrls: ['./artist-list.page.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ArtistListPage implements OnInit {
  authService = inject(AuthService);

  artistsFacade = inject(ArtistsFacade);

  profile$ = this.authService.loadProfile();

  ngOnInit(): void {
    this.artistsFacade.dispatch(loadArtists());
  }
  handleDelete(a: Artist) {}

  handleSubscribe(a: Artist) {}
}
