import { Injectable } from "@angular/core";
import { Profile } from "../models/auth.model";

@Injectable({providedIn: 'root'})
export class ProfileStorageService {

  private PROFILE_KEY = 'profile'

  setProfile(profile: Profile | null) {
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile))
  }

  getProfile(): Profile | null {

    const profileFromStorage = localStorage.getItem(this.PROFILE_KEY);

    if(!profileFromStorage) {
      return null;
    }

    try {
      return JSON.parse(profileFromStorage) as Profile
    } catch (error) {
      return null;
    }

  }
}
