import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, finalize, mergeWith, skip, switchMap, tap } from "rxjs";
import { BASE_URL } from "../api/api.config";
import { AuthResponse, LoginDto, RegisterDto, User } from "../api/api.model";
import { AuthStorage } from "./auth.storage";

export interface AuthState {
    loading: number;
    error?: any;
    accessToken?: string;
    user?: User;
}

const initialState: AuthState = {
    loading: 0,
}

@Injectable({
    providedIn: 'root'
})
export class AuthStore extends ComponentStore<AuthState> {

  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);
  private authStorage = inject(AuthStorage);


    get loading(): boolean {
        return this.get().loading > 0;
    }

    get error() {
        return this.get().error;
    }

    get user() {
        return this.get().user;
    }

    get accessToken() {
        return this.get().accessToken;
    }

    get isAuthorized(): boolean {
        return !!this.get().user;
    }

    user$ = this.select(state => state.user);
    accessToken$ = this.select(state => state.accessToken);

    storageState$ = this.select(
        this.accessToken$,
        this.user$,
        (accessToken, user ) => ({ accessToken, user })
    );


    constructor() {
        super(initialState);

        // load state from storage
        const state = this.authStorage.get();
        if(state) {
            this.patchState(state);
        }

        // udpate storage on state changes
        this.storageState$.subscribe(state => this.authStorage.set(state))
    }

    tapLoader<T>() {
        return tap<T>({
            subscribe: () => this.patchState({ error: null, loading: this.get().loading+1 }),
            finalize: () => this.patchState({ loading: this.get().loading-1 }),
            error: (error) => this.patchState({ error })
        })
    }

    register(data: RegisterDto): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.baseUrl+'/register', data).pipe(
            this.tapLoader(),
        );
    }

    login(data: LoginDto): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.baseUrl+'/login', data).pipe(
            this.tapLoader(),
            tap(res => this.patchState(res)),
        );
    }

    logout() {
        this.patchState({user: undefined, accessToken: undefined});
    }
}
