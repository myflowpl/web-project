import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: Role;
}

type ProfileState = {
  user: User | null;
};

const InitialState: ProfileState = {
  user: null,
};

export const ProfileStore = signalStore(
  { providedIn: 'root' },
  withState(InitialState),
  withMethods((store) => ({
    login(user: User) {
      patchState(store, { user });
    },
    logout() {
      patchState(store, { user: null });
    },
  }))
);

export type ProfileStore = InstanceType<typeof ProfileStore>;
