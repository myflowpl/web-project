import { ComponentStore } from "@ngrx/component-store";
import { Injectable, inject } from "@angular/core";
import { Artist } from "@asseco/api-client";

export interface ArtistsState {
    
}

const initState: ArtistsState = {
    
}

@Injectable({
    providedIn: 'root',
})
export class ProfileStore extends ComponentStore<ArtistsState> {
    
    constructor() {
        super(initState);
    }
}