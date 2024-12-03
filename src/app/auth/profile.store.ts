import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { User } from "../api/api.model";

type ProfileState = {
    user: User | null;
}

const InitialState: ProfileState = {
    user: null,
}

export const ProfileStore = signalStore(
    { providedIn: 'root' },
    withState(InitialState),
    withMethods((store) => ({
        login(user: User) {
            patchState(store, { user })
        },
        logout() {
            patchState(store, { user: null })
        }
    }))
);

export type ProfileStore = InstanceType<typeof ProfileStore>;