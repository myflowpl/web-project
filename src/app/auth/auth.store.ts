import { signalStore, withState } from "@ngrx/signals";

const init = {}

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(init),
);
