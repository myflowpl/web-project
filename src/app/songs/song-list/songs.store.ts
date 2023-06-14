import { Injectable, inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, finalize, mergeWith, skip, switchMap, tap } from "rxjs";
import { Song } from "src/app/api/api.model";
import { SongsService } from "./songs.service";
import { PageEvent } from "@angular/material/paginator";

export interface SongsState {
    loading: number;
    songs?: Song[];
    error?: any;
    page: PageEvent;
}

const initialState: SongsState = {
    loading: 0,
    page: {
        length: 0,
        pageIndex: 0,
        pageSize: 10,
    }
}

@Injectable()
export class SongsStore extends ComponentStore<SongsState> {

    private songsService = inject(SongsService);

    get loading(): boolean {
        return this.get().loading > 0;
    }

    set page(page: Partial<PageEvent>) {
        this.patchState({ 
            page: {
                ...this.get().page,
                ...page,
            }
         });
         this.init();
    }

    // select songs
    readonly songs$ = this.select(state => state.songs);
    readonly page$ = this.select(state => state.page);

    // load songs efect
    readonly init = this.effect((in$) => {
        return in$.pipe(
            // mergeWith(this.page$.pipe(skip(1))),
            switchMap(() => this.songsService.getSongs(this.get().page).pipe(
                this.tapLoader(),
                tapResponse(
                    (res) => this.patchState({ 
                        songs: res.songs, 
                        page: {...this.get().page, length: res.length} 
                    }),
                    // ({ songs }) => this.patchState({ songs }),
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

const a = { name: 'adam', title: 'student' }
const b = { title: 'doctor' }

const c = {
    ...a,
    ...b,
};

const { name, title } = a;

const arr = ['user', 'admin'];

// const user = arr[0];
// const role = arr[1];

const [user, role] = arr;

// console.log(name);
// console.log(a.name);
