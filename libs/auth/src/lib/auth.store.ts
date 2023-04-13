import { ComponentStore } from "@ngrx/component-store";
import { LoginDto, User, UserCreateDto, UserCreateResponse } from "@asseco/api-client";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EMPTY, Observable, catchError, exhaustMap, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { ProfileStore } from "./profile.store";

export interface AuthState {
    loading: boolean;
    error: any;
}

const initialState: AuthState = {
    loading: false,
    error: null,
}

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {

    error$ = this.select(state => state.error);

    loading$ = this.select(state => state.loading);

    private http = inject(HttpClient);

    private router = inject(Router);

    private profileStore = inject(ProfileStore);

    private baseUrl = 'http://localhost:3000';

    constructor() {
        super(initialState);
    }

    readonly register = this.effect((data$: Observable<UserCreateDto>) => {

        return data$.pipe(
            exhaustMap(data => {
                return this.http.post<UserCreateResponse>(this.baseUrl+'/register', data).pipe(
                    tap({
                        subscribe: () => this.patchState({
                            loading: true,
                            error: null,
                        }),
                        next: (res) => {
                            console.log(res);
                            this.router.navigateByUrl('/auth');
                        },
                        error: (error) => this.patchState({
                            error,
                        }),
                        finalize: () => this.patchState({
                            loading: false,
                        })
                    }),
                    catchError(() => EMPTY),
                )
            }),
        );
    });    

    readonly login = this.effect((data$: Observable<LoginDto>) => {

        return data$.pipe(
            exhaustMap(data => {
                return this.http.post<UserCreateResponse>(this.baseUrl+'/login', data).pipe(
                    tap({
                        subscribe: () => this.patchState({
                            loading: true,
                            error: null,
                        }),
                        next: (res) => {
                            console.log(res);
                            this.profileStore.patchState(res)
                            this.router.navigateByUrl('/');
                        },
                        error: (error) => this.patchState({
                            error,
                        }),
                        finalize: () => this.patchState({
                            loading: false,
                        })
                    }),
                    catchError(() => EMPTY),
                )
            }),
        );
    });    
}