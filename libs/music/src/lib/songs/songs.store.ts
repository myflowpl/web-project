import { ComponentStore } from "@ngrx/component-store";
import { Injectable, inject } from "@angular/core";
import { Artist, Song } from "@asseco/api-client";

export interface SongsState {
    
}

const initState: SongsState = {
    
}

@Injectable({
    providedIn: 'root',
})
export class SongsStore extends ComponentStore<SongsState> {
    
    constructor() {
        super(initState);
    }
}