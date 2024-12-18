import { computed, effect, inject } from "@angular/core"
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals"
import { tap } from "rxjs"
import { LoginDto, RegisterDto, User } from "../api/api.model"
import { UserService } from "./user.service"
import { loaderSignal } from "../utils/signal.utils"
import { injectLocalStorage, injectWindow } from "../utils/ssr.utils"

type ProfileState = {
    user: User | null,
    accessToken: string,
}

const initialState: ProfileState = {
    user: null,
    accessToken: '',
}

export const ProfileStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withComputed((store) => ({
        sessionData: computed(() => ({
            user: store.user(),
            accessToken: store.accessToken()
        })),
    })),
    withProps((store) => ({
        isLoading: loaderSignal(),
    })),
    withMethods((store, api = inject(UserService)) => ({ 
        logout() {
            patchState(store, {user: null, accessToken: ''})
        },
        login(data: LoginDto) {
            return api.login(data).pipe(
                store.isLoading.tap(),
                tap(res => {
                    patchState(store, {
                        user: res.user,
                        accessToken: res.accessToken,
                    })
                }),
            );
        },
        register(data: RegisterDto) {
            return api.register(data).pipe(
                store.isLoading.tap(),
                tap(res => {
                    patchState(store, {
                        user: res.user,
                        accessToken: res.accessToken,
                    })
                }),
            );
        },
     })),
     withHooks({
        onInit(store, localStorage = injectLocalStorage(), window = injectWindow()) {
            
            const KEY = 'auth_data';

            // check storage for existing session
            const data = localStorage.getItem(KEY);
            if(data) {
                const session = JSON.parse(data);
                patchState(store, session);
            }

            // update localStorage on session changes
            effect(() => {
                const data = store.sessionData();
                localStorage.setItem(KEY, JSON.stringify(data));
            })
        },
     }),
);

export type ProfileStore = InstanceType<typeof ProfileStore>;
