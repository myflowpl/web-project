import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, finalize, mergeWith, skip, switchMap, tap } from "rxjs";
import { BASE_URL } from "../api/api.config";
import { AuthResponse, RegisterDto } from "../api/api.model";

export interface AuthState {
    loading: number;
    error?: any;
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


    get loading(): boolean {
        return this.get().loading > 0;
    }

    get error() {
        return this.get().error;
    }


    constructor() {
        super(initialState);
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
}
