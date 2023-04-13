import { Injectable } from '@angular/core';
import { ProfileState } from './profile.store';

@Injectable({
    providedIn: 'root'
})
export class ProfileStorage {

    private KEY = 'user-profile';

    getProfile(): ProfileState | null {
        
        let profileStr = localStorage.getItem(this.KEY);

        if(profileStr) {
            return JSON.parse(profileStr);
        }
        return null;
    }

    setProfile(profile: ProfileState) {
        localStorage.setItem(this.KEY, JSON.stringify(profile));
    }
}
