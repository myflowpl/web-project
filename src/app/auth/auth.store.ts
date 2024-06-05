import { signalStore, withMethods, withState } from "@ngrx/signals";
import { RegisterDto, User } from "../api/api.model";
import { inject } from "@angular/core";
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
    withMethods((store) => ({
        
    })),
    withMethods((store, http = inject(HttpClient), baseUrl = inject(BASE_URL)) => ({

        register(data: RegisterDto) {
            return http.post(baseUrl+'/register', data).pipe(
                tapLoader(store),
            )
        }
    })),
);
