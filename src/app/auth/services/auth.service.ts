import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Profile } from '../auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private profile$$ = new BehaviorSubject<Profile | null>(null);

  public user$ = this.profile$$.asObservable().pipe(
    map(profile => profile?.user || null)
  );

  constructor() { }

  login() {
    this.profile$$.next({
      accessToken: '',
      user: {
        username: 'piotr-myflowpl'
      }
    })
  }

  logout() {
    this.profile$$.next(null)
  }
}
