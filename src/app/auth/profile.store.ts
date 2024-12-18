import { inject } from "@angular/core"
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals"
import { tap } from "rxjs"
import { LoginDto, RegisterDto, User } from "../api/api.model"
import { UserService } from "./user.service"
import { loaderSignal } from "../utils/signal.utils"

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
    withComputed((store) => ({})),
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
        onInit(store) {
            
        },
     }),
);

export type ProfileStore = InstanceType<typeof ProfileStore>;