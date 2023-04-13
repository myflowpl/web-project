import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Injectable, inject } from "@angular/core";
import { Artist, Song } from "@asseco/api-client";
import { Observable, switchMap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Sort } from "@angular/material/sort";

export interface SongsState {
    songs: Song[];
    sort: Sort;
    error?: HttpErrorResponse;
}

const initState: SongsState = {
    songs: [],
    sort: {
        active: 'title',
        direction: 'asc',
    }
}

@Injectable({
    providedIn: 'root',
})
export class SongsStore extends ComponentStore<SongsState> {

    private baseUrl = 'http://localhost:3000';
    private http = inject(HttpClient);

    songs$ = this.select(s => s.songs);

    columns = ['id', 
    'title', 
    'year', //'artist', 'url'
];
    
    constructor() {
        super(initState);
        this.state$.subscribe(s => console.log(s))
    }

    set sort(sort: Sort) {
        this.patchState({sort});
        this.init();
    }

    get sort(): Sort {
        return this.get().sort;
    }

    readonly init = this.effect((data$: Observable<void>) => {
        return data$.pipe(
            switchMap(() => {
                const params = {
                    _sort: this.sort.active,
                    _order: this.sort.direction,
                    _page: 7,
                    _limit: 5,
                }
                return this.http.get<Song[]>(this.baseUrl+'/songs', { params }).pipe(
                    tapResponse(
                        (songs) => this.patchState({songs}),
                        (error: HttpErrorResponse) => this.patchState({error})
                    ),
                )
            }),
        );
    });

}