import { ComponentStore } from "@ngrx/component-store";
import { User } from "@asseco/api-client";
import { Injectable } from "@angular/core";

export interface ProfileState {
    accessToken: string;
    user: User | null;
}

const initialProfileState: ProfileState = {
    accessToken: '',
    user: null,
}

@Injectable({
    providedIn: 'root',
})
export class ProfileStore extends ComponentStore<ProfileState> {

    user$ = this.select(state => state.user);

    get accessToken() {
        return this.get().accessToken;
    }

    constructor() {
        super(initialProfileState);
    }

}