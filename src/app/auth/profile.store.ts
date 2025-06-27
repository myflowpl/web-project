import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { isPlatformServer } from "@angular/common";
import { computed, effect, inject, PLATFORM_ID } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { AuthenticationApi, LoginRequestDto, User } from "@web/api-client";
import { injectIsServer, injectLocalStorage, injectWindow } from "@web/utils";
import { tap } from "rxjs";

type ProfileState = {
    accessToken: string;
    user: User | null;
}

const initialState: ProfileState = {
    accessToken: '',
    user: null,
}

export const ProfileStore = signalStore(
    { providedIn: 'root'},
    withDevtools('Profile'),
    withState(initialState),
    withComputed((store) => ({
        sessionData: computed(() => ({
            accesstoken: store.accessToken(),
            user: store.user(),
        }))
    })),
    withMethods((store, authApi = inject(AuthenticationApi)) => ({
        login(loginRequestDto: LoginRequestDto) {
            return authApi.loginPost({loginRequestDto}).pipe(
                tap(res => patchState(store, { accessToken: res.accessToken, user: res.user }))
            )
        },
        logout() {
            patchState(store, initialState);
        }
    })),

    withHooks({
        onInit(store, isServer = injectIsServer(), localStorage = injectLocalStorage(), window = injectWindow()) {
            
            const KEY = 'auth_data';

            // read localStorage
            const data = localStorage.getItem(KEY);
            if(data) {
                const session = JSON.parse(data);
                patchState(store, session);
            }

            // update localStorage
            effect(() => {
                const data = store.sessionData();
                localStorage.setItem(KEY, JSON.stringify(data));
            })
        }
    })
);