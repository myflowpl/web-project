import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { Contact } from "../api/api.model"
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { inject } from "@angular/core";
import { ContactService } from "./contact.service";

export interface ContactFilters {
    q?: string;
}

type ContactState = {
    contacts: Contact[];
    filters: ContactFilters
}

const initialState: ContactState = {
    contacts: [],
    filters: {},
}

export const ContactStore = signalStore(

    withState(initialState),

    withMethods((store, contactService = inject(ContactService)) => ({
        loadContacts: rxMethod<ContactFilters>(pipe(
            switchMap(params => {

                return contactService.getAllContacts().pipe(
                    tap(contacts => patchState(store, { contacts })),
                );
            }),
        )),
        setFilters(filters: ContactFilters) {
            patchState(store, { filters });
        }
    })),

    withHooks({
        onInit(store) {
            store.loadContacts({});
        }
    })
);
