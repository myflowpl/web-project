import { Pet, PetApi } from "@web/api-client";
import { PetStatus } from "./pet.model";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { debounceTime, pipe, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapLoader } from "@web/utils";

export interface PetState {
    pets: Pet[];
    isLoading: boolean;
    error: any;
    status: PetStatus;
    selectedId: number | null;
    details: Pet | null
}

const initialState: PetState = {
    pets: [],
    isLoading: false,
    error: null,
    status: 'available',
    selectedId: null,
    details: null,
}

export const PetStore = signalStore(
    // provider config
    { providedIn: 'root'},

    // initial state
    withState(initialState),

    // computed signals
    withComputed((store) => ({
        selectedPet: computed(() => {
            const id = store.selectedId();
            return store.pets().find(pet => pet.id === id);
        }),
        title: computed(() => {
            const status = store.status();
            const count = store.pets().length;

            return `Znaleziono ${count} ${status} zwierzaków`;
        }),
    })),

    // metody
    withMethods((store, petApi = inject(PetApi)) => ({ 
        reload() {},
        setSelectedId(selectedId?: number) {
            patchState(store, { selectedId })
        },
        loadStatus: rxMethod<PetStatus>(pipe(
            debounceTime(10),
            tap(status => patchState(store, { status })),
            switchMap(
                status => petApi.findPetsByStatus({status: [status]}).pipe(
                    tapLoader(store, (pets) => patchState(store, { pets }))
                )
            ),
        )),
    })),

    // lifecycle hooks
    withHooks({
        onInit(store) {
            
        },
        onDestroy(store) {
            
        },
    }),
);