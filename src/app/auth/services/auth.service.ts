import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Profile } from '../auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private profile$$ = new BehaviorSubject<Profile | null>(null);

  public profile$ = this.profile$$.asObservable();

  get token() {
    return this.profile$$.getValue()?.accessToken || '';
  }

  get user() {
    return this.profile$$.getValue()?.user || null;
  }

  constructor(

  ) { }

  login() {
    this.profile$$.next({
      accessToken: 'sdfsdf',
      user: {
        id: 1,
        name: 'Piotr',
        email: 'Piotr@mcos.pl'
      }
    });
    return this.profile$;
  }

  logout() {
    this.profile$$.next(null);
  }
}
