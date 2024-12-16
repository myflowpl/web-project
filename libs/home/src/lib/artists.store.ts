import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { debounceTime, pipe, switchMap, tap, of } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapLoader } from '@web/utils';
import { Artist, ArtistDto, ArtistsService } from './artists.service';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export interface ArtistsState {
  artists: Artist[];
  length: number;
  params: ArtistDto;

  isLoading: boolean;
  error: any;
}

const initialState: ArtistsState = {
  artists: [],
  length: 0,
  params: {
    _page: 1,
    _limit: 3,
  },

  isLoading: false,
  error: null,
};

export const ArtistsStore = signalStore(
  withState(initialState),
  withDevtools('ArtistsStore'),
  withComputed((store) => ({
    limit: computed(() => store.params._limit())
  })),

  withMethods((store, api = inject(ArtistsService)) => ({

    patchParams(params: Partial<ArtistDto>) {
      patchState(store, { 
        params: {
          ...store.params(),
          ... params,
        }
       });
    },

    search: rxMethod<ArtistDto>(
      pipe(
        debounceTime(10),
        switchMap((params) =>
          api
            .search(params)
            .pipe(tapLoader(store, (response) => {
              patchState(store, response);
            }))
        )
      )
    ),
  })),

  // lifecycle hooks
  withHooks({
    onInit(store) {
      store.search(store.params)
    },
    onDestroy(store) {},
  })
);

export type ArtistsStore = InstanceType<typeof ArtistsStore>;
