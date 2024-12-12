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

class PetApi {
  find(status: { status: string }) {
    return of([]);
  }
}
interface Pet {
  id: number;
}

export interface TestNewState {
  pets: Pet[];
  isLoading: boolean;
  error: any;
  selectedId: number | null;
}

const initialState: TestNewState = {
  pets: [],
  isLoading: false,
  error: null,
  selectedId: null,
};

export const TestNewStore = signalStore(
  // provider config
  { providedIn: 'root' },

  // initial state
  withState(initialState),

  // computed signals
  withComputed((store) => ({
    selectedPet: computed(() => {
      const id = store.selectedId();
      if (!id) return;
      return store.pets().find((pet) => pet.id === id);
    }),
    title: computed(() => {
      const count = store.pets().length;

      return `Znaleziono ${count}  zwierzaków`;
    }),
  })),

  // metody
  withMethods((store, petApi = inject(PetApi)) => ({
    reload() {},
    setSelectedId(selectedId?: number) {
      patchState(store, { selectedId });
    },
    loadStatus: rxMethod<string>(
      pipe(
        debounceTime(10),
        tap((status) => patchState(store, {})),
        switchMap((status) =>
          petApi
            .find({ status })
            .pipe(tapLoader(store, (pets) => patchState(store, { pets })))
        )
      )
    ),
  })),

  // lifecycle hooks
  withHooks({
    onInit(store) {},
    onDestroy(store) {},
  })
);
