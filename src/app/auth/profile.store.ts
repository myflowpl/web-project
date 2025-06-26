import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { computed, effect, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { AuthenticationApi, LoginRequestDto, User } from "@web/api-client";
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
        onInit(store) {
            const KEY = 'auth_data';
            // TODO
            if(typeof localStorage === 'undefined') {
                return;
            }

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