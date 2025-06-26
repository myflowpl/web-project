import { SongsApi, SongsResponseDto } from "@web/api-client";
import { patchState, signalStore, withComputed, withMethods, withState, signalMethod, withProps } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { distinctUntilChanged, filter, pipe, switchMap, tap } from "rxjs";
import { loaderSignal } from "@web/utils";


type SongsState = {
    artistId: number | null;
    response: SongsResponseDto | null; 
}

const initialState: SongsState = {
    artistId: null,
    response: null,
}

export const SongsStore = signalStore(
    withState(initialState),
    // props
    withProps((store) => ({
        loader: loaderSignal()
    })),
    // computed
    withComputed((store) => ({
        songs: computed(() => store.response()?.data || []),
    })),
    // sync methods
    withMethods((store, songsApi = inject(SongsApi)) => ({
        setArtistId(artistId: number) {
            patchState(store, { artistId });
        },
    })),
    // reactive methods
    withMethods((store, songsApi = inject(SongsApi)) => ({
        loadSongsByArtistId: rxMethod<number>(pipe(
            filter(id => !!id),
            distinctUntilChanged(),
            switchMap(
                (artistId) => songsApi.songsGet({ artistId }).pipe(
                    store.loader.tap(),
                    tap(response => patchState(store, { response }))
                )
            ),
        )),
    })),

);

export type SongsStore = InstanceType<typeof SongsStore>;
