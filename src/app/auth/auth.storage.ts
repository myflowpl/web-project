import { Injectable } from "@angular/core";
import { User } from "../api/api.model";

export interface AuthStorageState {
    accessToken?: string;
    user?: User;
}

@Injectable({
    providedIn: 'root'
})
export class AuthStorage {

    private KEY = 'auth-state';

    set(state: AuthStorageState) {
        localStorage.setItem(this.KEY, JSON.stringify(state))
    }

    get(): AuthStorageState | null {

        let stateStr = localStorage.getItem(this.KEY);

        if(stateStr) {
            return JSON.parse(stateStr);
        }

        return null;
    }

}
