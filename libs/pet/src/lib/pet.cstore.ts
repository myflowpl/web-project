import { Pet, PetApi, User } from "@web/api-client";
import { ComponentStore } from "@ngrx/component-store";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { PetStatus } from "./pet.model";
import { BehaviorSubject, catchError, combineLatest, debounceTime, EMPTY, filter, interval, map, merge, Observable, of, Subject, switchMap, tap } from "rxjs";
import { injectIsServer, tapStoreLoader } from "./utils";
import { isPlatformServer } from "@angular/common";

export interface PetState {
    pets: Pet[];
    isLoading: boolean;
    error: any;
    status: PetStatus;

    selectedId?: number;

    details?: Pet
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

    private reload$$ = new Subject();

    private reload$ = merge(
        injectIsServer() ? of(1) : interval(5000),
        this.reload$$
    );

    // selektory
    pets$ = this.select(state => state.pets);
    isLoading$ = this.select(state => state.isLoading);
    error$ = this.select(state => state.error);
    status$ = this.select(state => state.status);
    details$ = this.select(state => state.details);

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
        this.reload$$.next(undefined);
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

    loadPetDetails = this.effect(() => {
        return this.selectedId$.pipe(
            debounceTime(10),
            tap(() => this.patchState({details: undefined})),
            filter(petId => !!petId),
            map(id => id as number),
            switchMap(
                (petId) => this.petApi.getPetById({ petId }).pipe(
                    tap({
                        next: (details) => this.patchState({details}),
                        error: (error) => this.patchState({error})
                    }),
                    catchError(error => EMPTY),
                )
            ),
        );
    });

}