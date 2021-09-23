import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SignInDto, SignInResponseDto, SignUpDto, SignUpResponseDto, User } from '../../api/api.models';
import { API_BASE_URL } from '../../app.config';
import { Profile } from '../models/auth.model';
import { ProfileStorageService } from './profile-storage.service';

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
    profileStorage: ProfileStorageService,
  ) {
    // get profile from storage
    this.profile$$.next(profileStorage.getProfile());

    // update storage on profile changes
    this.profile$.subscribe(profile => profileStorage.setProfile(profile));
  }

  signUp(data: SignUpDto) {

    return this.http.post<SignUpResponseDto>(`${this.baseUrl}/signup`, data).pipe(
      switchMap((res) => this.getProfile(res.accessToken)),
      tap((profile) => this.profile$$.next(profile))
    );
  }

  signIn(data: SignInDto) {

    return this.http.post<SignInResponseDto>(`${this.baseUrl}/signin`, data).pipe(
      switchMap(res => this.getProfile(res.accessToken)),
      tap(profile => this.profile$$.next(profile))
    );
  }

  signOut() {
    return new Observable(() => {
      this.profile$$.next(null);
    });
  }

  getProfile(accessToken: string) {

    const payload: {sub: string} = jwtDecode(accessToken);

    return this.http.get<User>(
      `${this.baseUrl}/users/${payload.sub}`,
      {headers: {Authorization: `Bearer ${accessToken}`}}
    ).pipe(
      map(user => ({accessToken, user} as Profile))
    );
  }

  isValidEmail(email: string): Observable<boolean> {

    return this.http.get<User[]>(`${this.baseUrl}/emails/${email}`).pipe(
      map(users => users.length === 0)
    );

  }
}
