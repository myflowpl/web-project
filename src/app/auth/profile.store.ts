import { signalStore, withState } from "@ngrx/signals";
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
);

export type ProfileStore = InstanceType<typeof ProfileStore>;