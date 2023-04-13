import { ComponentStore } from "@ngrx/component-store";
import { User } from "@asseco/api-client";
import { Injectable, inject } from "@angular/core";
import { ProfileStorage } from "./profile.storage";

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
        const storage = inject(ProfileStorage);
        const profile = storage.getProfile();
        
        super(profile || initialProfileState);

        this.state$.subscribe(state => storage.setProfile(state));
    }

    logout() {
        this.setState(initialProfileState);
    }
}