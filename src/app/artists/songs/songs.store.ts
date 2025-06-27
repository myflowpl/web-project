import { SongsApi, SongsGetRequestParams, SongsResponseDto } from "@web/api-client";
import { patchState, signalStore, withComputed, withMethods, withState, signalMethod, withProps, withHooks } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { filter, map, pipe, switchMap, tap } from "rxjs";
import { loaderSignal } from "@web/utils";
import { PageEvent } from "@angular/material/paginator";
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type SongsState = {
    artistId: number | null;
    pageSize: number;
    pageIndex: number;
    response: SongsResponseDto | null; 
}

const initialState: SongsState = {
    artistId: null,
    response: null,
    pageSize: 2,
    pageIndex: 0,
}

export const SongsStore = signalStore(
    withDevtools('Songs'),
    withState(initialState),
    // props
    withProps((store) => ({
        loader: loaderSignal()
    })),
    // computed
    withComputed((store) => ({
        songs: computed(() => store.response()?.data || []),
        length: computed(() => store.response()?.length || 0),
        requestParams: computed<SongsGetRequestParams | null>(() => {

            const artistId = store.artistId();

            if(!artistId) {
                return null;
            }

            return {
                artistId,
                pageIndex: store.pageIndex(),
                pageSize: store.pageSize(),
            }
        }),
    })),
    // sync methods
    withMethods((store) => ({
        setPage(page: PageEvent) {
            patchState(store, { 
                pageIndex: page.pageIndex, 
                pageSize: page.pageSize 
            });
        },
        setArtistId: signalMethod<number>((artistId) => patchState(store, { artistId })),
    })),
    // reactive methods
    withMethods((store, songsApi = inject(SongsApi)) => ({
        loadSongs: rxMethod<SongsGetRequestParams | null>(pipe(
            filter(Boolean),
            switchMap(
                (params) => songsApi.songsGet(params).pipe(
                    store.loader.tap(),
                    tap(response => patchState(store, { response }))
                )
            ),
        )),
    })),

    // sync methods
    withMethods((store) => ({
        reload() {
            store.loadSongs(store.requestParams());
        },
    })),

    // hooks
    withHooks({
        onInit(store) {
            store.loadSongs(store.requestParams);
        },
    })
);

export type SongsStore = InstanceType<typeof SongsStore>;
