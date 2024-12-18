import { computed, inject } from "@angular/core"
import { Song, SongDto } from "../../api/api.model"
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { pipe, switchMap, tap } from "rxjs"
import { SongsService } from "./songs.service"
import { loaderSignal } from "../../utils/signal.utils"
import { PageEvent } from "@angular/material/paginator"

type SongsState = {
    songs: Song[],
    length: number,
    artistId: number,
    pageSize: number,
    pageIndex: number,
}

const initialState: SongsState = {
    songs: [],
    length: 0,
    artistId: 1,
    pageIndex: 0,
    pageSize: 2,
}

export const SongsStore = signalStore(
    // {providedIn: 'root'},
    withState(initialState),
    withComputed((store) => ({
        loadParams: computed<SongDto>(() => ({
            artistId: store.artistId(),
            _page: store.pageIndex()+1,
            _limit: store.pageSize()
        }))
    })),
    withProps((store) => ({
        loader: loaderSignal(),
        isCreating: loaderSignal(),
    })),
    withMethods((store, songsService = inject(SongsService)) => ({ 
        setArtistId(artistId: number) {
            patchState(store, {artistId});
        },
        connectArtistId: signalMethod<number>((artistId) => {
            patchState(store, {artistId});
        }),
        setPageIndex: signalMethod<PageEvent>((event: PageEvent) => {
            patchState(store, {
                pageIndex: event.pageIndex, 
                pageSize: event.pageSize
            });
        }),
        // load artist songs
        load: rxMethod<SongDto>(pipe(
            tap(() => patchState(store, {songs: [], length: 0})),
            switchMap(
                (params) => songsService.getSongsByArtistId(params).pipe(
                    store.loader.tap(),
                    tap((res) => patchState(store, res)),
                )
            ),
        )),

        // load artist songs
        loadSongsByArtistId: rxMethod<number>(pipe(
            tap(artistId => patchState(store, {artistId, songs: [], length: 0})),
            switchMap(
                (artistId) => songsService.getSongsByArtistId({ artistId }).pipe(
                    store.loader.tap(),
                    tap((res) => patchState(store, res)),
                )
            ),
        )),

        create(song: Partial<Song>) {
            return songsService.create(song).pipe(
                store.isCreating.tap(),
                tap(song => {
                    patchState(store, {
                        songs: [
                            song,
                            ...store.songs(),
                        ],
                    })
                }),
            );
        }
     })),
     withHooks({
        onInit(store) {
            store.load(store.loadParams);
        },
     }),
);

export type SongsStore = InstanceType<typeof SongsStore>;