import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Pet, PetApi } from '../api-client';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { tapLoader } from '../utils';

export type Status = 'sold' | 'available' | 'pending';

type PetsState = {
  pets: Pet[];
  isLoading: boolean;
  status: Status;
  error: any | null;
  filters: { dir: string; sort: string };
};

const initialState: PetsState = {
  pets: [],
  isLoading: false,
  status: 'available',
  error: null,
  filters: { dir: 'asc', sort: 'name' },
};

export const PetsStore = signalStore(
  // { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    title: computed(() => {
      const status = store.status();
      const count = store.pets().length;

      return `Znaleziono ${count} ${status} zwierzakow`;
    }),
  })),
  withMethods((store, petApi = inject(PetApi)) => ({
    setStatus: (status: Status) => {
      patchState(store, { status });
    },
    loadPets: rxMethod<Status>(
      pipe(
        debounceTime(10),
        distinctUntilChanged(),
        tap((status) => patchState(store, { status, pets: [] })),
        switchMap((status) =>
          petApi
            .findPetsByStatus({ status: [status] })
            .pipe(tapLoader(store, (pets) => patchState(store, { pets })))
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      console.log('INIT PET STORE');

      // store.loadPets(store.status);
    },
    onDestroy(store) {
      console.log('DESTROY PET STORE');
    },
  })
);

export type PetsStore = InstanceType<typeof PetsStore>;