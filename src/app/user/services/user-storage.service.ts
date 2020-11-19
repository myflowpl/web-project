import { Injectable } from '@angular/core';
import { User } from '../../api/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  USER_KEY = 'user';
  TOKEN_KEY = 'token';

  setUser(user: User | null) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  getUser(): User | null {
    const userFromStorage = localStorage.getItem(this.USER_KEY);
    if(userFromStorage) {
      try {
        return JSON.parse(userFromStorage) as User;
      } catch (error) {
        return null
      }
    }
    return null;
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || '';
  }
}
