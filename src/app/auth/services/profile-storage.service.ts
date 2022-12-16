import { Injectable } from '@angular/core';
import { Profile } from '../auth.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileStorageService {
  private readonly PROFILE_KEY = 'profile';

  getProfile(): Profile | null {
    const profileStr = localStorage.getItem(this.PROFILE_KEY);
    if (!profileStr) {
      return null;
    }
    try {
      return JSON.parse(profileStr);
    } catch (error) {
      return null;
    }
  }

  setProfile(profile: Profile | null) {
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
  }
}
