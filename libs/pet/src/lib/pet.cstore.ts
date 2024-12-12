import { Pet, PetApi } from "@web/api-client";
import { ComponentStore } from "@ngrx/component-store";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { PetStatus } from "./pet.model";
import { BehaviorSubject, catchError, combineLatest, debounceTime, EMPTY, interval, map, Observable, of, switchMap, tap } from "rxjs";
import { injectIsServer, tapStoreLoader } from "./utils";
import { isPlatformServer } from "@angular/common";

export interface PetState {
    pets: Pet[];
    isLoading: boolean;
    error: any;
    status: PetStatus;

    selectedId?: number;
}

const initialState: PetState = {
    pets: [],
    isLoading: false,
    error: null,
    status: 'available',
}

@Injectable({providedIn: 'root'})
export class PetStore extends ComponentStore<PetState> {

    petApi = inject(PetApi);

    private reload$ = injectIsServer() ? of(1) : interval(5000);

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
    reload() {
        // this.reload$.next(undefined);
    }
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
    loadStatus = this.effect((status$: Observable<PetStatus>) => {
        return combineLatest([status$, this.reload$]).pipe(
            debounceTime(10),
            tap(([status]) => this.patchState({ status })),
            switchMap(
                ([status]) => this.petApi.findPetsByStatus({status: [status]}).pipe(
                    tapStoreLoader(this, (pets) => this.patchState({pets})),

                )
            ),
        );
    });


    // effects
    // efekt ktory wykonuje sie automatycznie
    // loadPets = this.effect(() => {
    //     return this.status$.pipe(
    //         debounceTime(10),
    //         switchMap(
    //             (status) => this.petApi.findPetsByStatus({status: [status]}).pipe(
    //                 tap({
    //                     next: (pets) => this.patchState({pets}),
    //                     error: (error) => this.patchState({error})
    //                 }),
    //                 catchError(error => EMPTY),
    //             )
    //         ),
    //     );
    // });

}