import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignUpDto } from '../../api/api.models';
import { API_BASE_URL } from '../../app.config';
import { Profile } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private profile$$ = new BehaviorSubject<Profile | null>(null);

  public profile$ = this.profile$$.asObservable();

  get token() {
    return this.profile$$.getValue()?.accessToken;
  }

  get user() {
    return this.profile$$.getValue()?.user;
  }

  constructor(
    @Inject(API_BASE_URL)
    private baseUrl: string,
    private http: HttpClient,
  ) { }

  signUp(data: SignUpDto) {
    return this.http.post(`${this.baseUrl}/signup`, data).pipe(
      tap((profile: any) => this.profile$$.next(profile))
    );
  }

  signIn() {

  }

  signOut() {
    this.profile$$.next(null);
  }
}
