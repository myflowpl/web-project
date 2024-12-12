import { Pet, PetApi } from "@web/api-client";
import { ComponentStore } from "@ngrx/component-store";
import { inject, Injectable } from "@angular/core";
import { PetStatus } from "./pet.model";
import { debounceTime, Observable, switchMap, tap } from "rxjs";

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

    petApi = inject(PetApi);

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
        this.patchState({
            selectedId
        });
    }

    setStatus = this.updater((state, status: PetStatus) => ({
        ...state,
        status,
    }));

    // effects
    loadPets = this.effect(() => {
        return this.status$.pipe(
            debounceTime(10),
            switchMap(
                (status) => this.petApi.findPetsByStatus({status: [status]}).pipe(
                    tap({
                        next: (pets) => this.patchState({pets}),
                        error: (error) => this.patchState({error})
                    }),
                )
            ),
        );
    });

    loadStatus = this.effect((status$: Observable<PetStatus>) => {
        return status$.pipe(
            debounceTime(10),
            tap(status => this.setStatus(status)),
            switchMap(
                (status) => this.petApi.findPetsByStatus({status: [status]}).pipe(
                    tap({
                        next: (pets) => this.patchState({pets}),
                        error: (error) => this.patchState({error})
                    }),
                )
            ),
        );
    });
}