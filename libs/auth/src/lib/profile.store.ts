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
import { AuthApi, User } from '@web/api';


export interface ProfileState {
  user: User | null;
  isLoading: boolean;
  error: any;
}

const initialState: ProfileState = {
  user: null,
  isLoading: false,
  error: null,
};

export const ProfileStore = signalStore(
  // provider config
  { providedIn: 'root' },

  // initial state
  withState(initialState),

  // computed signals
  withComputed((store) => ({
  })),

  // metody
  withMethods((store, authApi = inject(AuthApi)) => ({
    login(user: any) {
      patchState(store, { user });
    },
    logout() {
      patchState(store, { user: null });
    },
    // loadStatus: rxMethod<string>(
    //   pipe(
    //     debounceTime(10),
    //     tap((status) => patchState(store, {})),
    //     switchMap((status) =>
    //       petApi
    //         .find({ status })
    //         .pipe(tapLoader(store, (pets) => patchState(store, { pets })))
    //     )
    //   )
    // ),
  })),

  // lifecycle hooks
  withHooks({
    onInit(store) {},
    onDestroy(store) {},
  })
);

export type ProfileStore = InstanceType<typeof ProfileStore>;
