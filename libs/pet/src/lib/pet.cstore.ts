import { Pet } from "@web/api-client";
import { ComponentStore } from "@ngrx/component-store";
import { Injectable } from "@angular/core";
import { PetStatus } from "./pet.model";

export interface PetState {
    pets: Pet[];
    isLoading: boolean;
    error: any;
    status: PetStatus;

    selectedId?: number;
}

const initialState: PetState = {
    pets: [
        {id: 1, name: 'pierwszy rekord', photoUrls: []},
        {id: 2, name: 'drugi rekord', photoUrls: []},
        {id: 3, name: '3333 rekord', photoUrls: []},
    ],
    isLoading: false,
    error: null,
    status: 'available',
}

@Injectable()
export class PetStore extends ComponentStore<PetState> {

    // selektory
    pets$ = this.select(state => state.pets);
    isLoading$ = this.select(state => state.isLoading);
    error$ = this.select(state => state.error);
    status$ = this.select(state => state.status);

    selectedId$ = this.select(state => state.selectedId);

    selectedPet$ = this.select(
        this.pets$,
        this.selectedId$,
        (pets, selectedId) => pets.find(pet => pet.id === selectedId) 
    )

    // initial state
    constructor() {
        super(initialState);
        
    }

    // methods
    setSelectedId(selectedId?: number) {
        const state = this.get();
        this.patchState({
            selectedId
        })
    }

    setStatus = this.updater((state, status: PetStatus) => ({
        ...state,
        status,
    }));

    // effects

}