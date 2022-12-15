import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getArtists } from "./artists.selectors";

@Injectable({providedIn: 'root'})
export class ArtistsFacade {
  store = inject(Store);

  artists$ = this.store.select(getArtists)
}
