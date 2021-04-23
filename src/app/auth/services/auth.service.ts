import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../../api/api.config';
import { User } from '../../api/api.models';
import { Profile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private profile$$ = new BehaviorSubject<Profile | null>(null);
  public profile$ = this.profile$$.asObservable();

  get token(): string {
    return this.profile$$.getValue()?.accessToken || '';
  }

  get user(): User | null {
    return this.profile$$.getValue()?.user || null;
  }

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL)
    private baseUrl: string,
  ) {
    this.profile$$.next({
      accessToken: 's34gk5g45jkg',
      user: {
        id: 1,
        name: 'Piotr',
        email: 'piotr@myflow.pl',
      }
    })
  }

  signOut() {
    this.profile$$.next(null)
  }
}
