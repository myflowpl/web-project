import { Injectable } from '@angular/core';
import { Profile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileStorageService {

  private PROFILE_KEY = 'profile';

  getProfile(): Profile | null {

    const profileString = localStorage.getItem(this.PROFILE_KEY);

    if(profileString) {
      try {
        return JSON.parse(profileString);
      } catch (error) {}
    }

    return null
  }

  setProfile(profile: Profile | null) {
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
  }
}
