import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Contact, ContactFilters } from "../api/api.model"
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { computed, inject } from "@angular/core";
import { ContactService } from "./contact.service";
import { tapLoader } from "../injection.utils";


type ContactState = {
    contacts: Contact[];
    filters: ContactFilters;
    loading: boolean;
    error: any;
}

const initialState: ContactState = {
    contacts: [],
    filters: {},
    loading: false,
    error: null,
}

export const ContactStore = signalStore(

    withState(initialState),

    withComputed((store) => ({
        loadLabel: computed(() =>{
            return store.loading() ? 'Szukam...' : 'Szukaj';
        })
    })),

    withMethods((store, contactService = inject(ContactService)) => ({
        
        setFilters(filters: ContactFilters) {
            patchState(store, { filters });
        },
    })),

    withMethods((store, contactService = inject(ContactService)) => ({

        loadContacts: rxMethod<ContactFilters>(pipe(
            switchMap(params => {
                store.setFilters(params);
                return contactService.getAllContacts(params).pipe(
                    tapLoader(store, contacts => patchState(store, { contacts })),
                );
            }),
        )),
    })),

    withHooks({
        onInit(store) {
            
        }
    })
);
