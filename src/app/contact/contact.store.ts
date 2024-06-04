import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { Contact, ContactFilters } from "../api/api.model"
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { inject } from "@angular/core";
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

    withMethods((store, contactService = inject(ContactService)) => ({
        
        setFilters(filters: ContactFilters) {
            patchState(store, { filters });
        },

        loadContacts: rxMethod<ContactFilters>(pipe(
            switchMap(params => {
                
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
