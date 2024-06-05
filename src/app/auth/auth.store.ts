import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { LoginDto, RegisterDto, User, UserCreateResponse } from "../api/api.model";
import { computed, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../api/api.config";
import { tapLoader } from "../injection.utils";

type AuthState = {

    user: User | null;
    accessToken: string;

    loading: boolean;
    error: any;
}

const initState: AuthState = {
    user: null,
    accessToken: '',
    loading: false,
    error: null,
}

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initState),
    withComputed((store) => ({
        userPhoto: computed(() => {
            const user = store.user();
            if(user) {
                return `https://randomuser.me/api/portraits/men/${user.id}.jpg`
            }
            return `https://randomuser.me/api/portraits/lego/7.jpg`;
        })
    })),
    withMethods((store) => ({
        logout() {
            patchState(store, {user: null, accessToken: ''});
        }
    })),
    withMethods((store, http = inject(HttpClient), baseUrl = inject(BASE_URL)) => ({

        register(data: RegisterDto) {
            return http.post(baseUrl+'/register', data).pipe(
                tapLoader(store),
            )
        },

        login(data: LoginDto) {
            return http.post<UserCreateResponse>(baseUrl+'/login', data).pipe(
                tapLoader(store, (res => {
                    patchState(store, { 
                        user: res.user, 
                        accessToken: res.accessToken 
                    });
                })),
            )
        }
    })),
);
