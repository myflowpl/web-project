import { Song } from "../../api/api.model"
import { signalStore, withState } from "@ngrx/signals"

type SongsState = {
    songs: Song[],
    artistId: number,
}

const initialState: SongsState = {
    songs: [],
    artistId: 0,
}

export const SongsStore = signalStore(
    withState(initialState),
    
);

export type SongsStore = InstanceType<typeof SongsStore>;