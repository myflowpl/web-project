import { ComponentStore } from "@ngrx/component-store";
import { User, UserCreateDto } from "@asseco/api-client";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EMPTY, Observable, catchError, exhaustMap, switchMap, tap } from "rxjs";

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

    private baseUrl = 'http://localhost:3000';

    constructor() {
        super(initialState);
    }

    readonly register = this.effect((data$: Observable<UserCreateDto>) => {

        return data$.pipe(
            exhaustMap(data => {
                return this.http.post<UserCreateDto>(this.baseUrl+'/register', data).pipe(
                    tap({
                        subscribe: () => this.patchState({loading: true}),
                        next: (res) => {
                            console.log(res);
                        },
                        error: (error) => this.patchState({
                            error,
                            loading: false,
                        })
                    }),
                    catchError(() => EMPTY),
                )
            }),
        );
    });    
}