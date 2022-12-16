import { inject, Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { selectRouteParam } from '../../reducers';
import { getArtists, getLoading } from './artists.selectors';

@Injectable({ providedIn: 'root' })
export class ArtistsFacade {
  store = inject(Store);

  artists$ = this.store.select(getArtists);
  loading$ = this.store.select(getLoading);

  artistId$ = this.store.select(selectRouteParam('artistId'));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
