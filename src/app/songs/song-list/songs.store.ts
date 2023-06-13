import { Injectable, inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, finalize, switchMap, tap } from "rxjs";
import { Song } from "src/app/api/api.model";
import { SongsService } from "./songs.service";

export interface SongsState {
    loading: number;
    songs?: Song[];
    error?: any,
}

const initialState: SongsState = {
    loading: 0,
}

@Injectable()
export class SongsStore extends ComponentStore<SongsState> {

    private songsService = inject(SongsService);

    get loading(): boolean {
        return this.get().loading > 0;
    }

    // select songs
    readonly songs$ = this.select(state => state.songs);

    // load songs efect
    readonly init = this.effect((in$) => {
        return in$.pipe(
            switchMap(() => this.songsService.getSongs().pipe(
                this.tapLoader(),
                tapResponse(
                    songs => this.patchState({ songs }),
                    error => this.patchState({error}),
                ),
            )),
        );
    });

    // update song efect
    readonly update = this.effect((song$: Observable<Partial<Song>>) => {
        return song$.pipe(
            switchMap((song) => this.songsService.update(song).pipe(
                this.tapLoader(),
                tapResponse(
                    song => this.init(),
                    error => this.patchState({error}),
                ),
            )),
        );
    });

    constructor() {
        super(initialState);
    }

    tapLoader<T>() {
        return tap<T>({
            subscribe: () => this.patchState({ loading: this.get().loading+1 }),
            finalize: () => this.patchState({ loading: this.get().loading-1 })
        })
    }
}