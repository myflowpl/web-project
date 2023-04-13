import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Injectable, inject } from "@angular/core";
import { Artist, Song } from "@asseco/api-client";
import { Observable, switchMap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

export interface SongsState {
    songs: Song[];
    error?: HttpErrorResponse;
}

const initState: SongsState = {
    songs: [],
}

@Injectable({
    providedIn: 'root',
})
export class SongsStore extends ComponentStore<SongsState> {

    private baseUrl = 'http://localhost:3000';
    private http = inject(HttpClient);

    songs$ = this.select(s => s.songs);
    
    constructor() {
        super(initState);
    }

    readonly init = this.effect((data$: Observable<void>) => {
        return data$.pipe(
            switchMap(() => {

                return this.http.get<Song[]>(this.baseUrl+'/songs').pipe(
                    tapResponse(
                        (songs) => this.patchState({songs}),
                        (error: HttpErrorResponse) => this.patchState({error})
                    ),
                )
            }),
        );
    });

}