import { inject } from "@angular/core"
import { Song } from "../../api/api.model"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { pipe, switchMap, tap } from "rxjs"
import { SongsService } from "./songs.service"

type SongsState = {
    songs: Song[],
    length: number,
    artistId: number,
}

const initialState: SongsState = {
    songs: [],
    length: 0,
    artistId: 0,
}

export const SongsStore = signalStore(
    // {providedIn: 'root'},
    withState(initialState),

    withMethods((store, songsService = inject(SongsService)) => ({ 
        // load artist songs
        loadSongsByArtistId: rxMethod<number>(pipe(
            tap(artistId => patchState(store, {artistId, songs: [], length: 0})),
            switchMap(
                (artistId) => songsService.getSongsByArtistId({ artistId }).pipe(
                    tap((res) => patchState(store, res))
                )
            ),
        ))
     })),
);

export type SongsStore = InstanceType<typeof SongsStore>;