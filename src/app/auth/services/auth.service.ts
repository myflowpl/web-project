import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BASE_URL } from '../../api/api.config';
import { SignInDto, SignInResponseDto, SignUpDto, SignUpResponseDto, User } from '../../api/api.models';
import { Profile } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from "rxjs/operators";
import { ProfileStorageService } from './profile-storage.service';

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
    private storage: ProfileStorageService,
  ) {
    // init sesji na starcie appki
    this.profile$$.next(this.storage.getProfile());
    // zapisywanie zmian w profile do sesji
    this.profile$.subscribe(profile => this.storage.setProfile(profile));
  }

  signOut() {
    this.profile$$.next(null)
  }

  signUp(data: SignUpDto): Observable<Profile> {
    return this.http.post<SignUpResponseDto>(this.baseUrl + '/signup', data).pipe(
      switchMap(res => this.getProfile(res.accessToken)),
      tap(profile => this.profile$$.next(profile)),
    )
  }

  signIn(data: SignInDto): Observable<Profile> {
    return this.http.post<SignInResponseDto>(this.baseUrl + '/signin', data).pipe(
      switchMap(res => this.getProfile(res.accessToken)),
      tap(profile => this.profile$$.next(profile)),
    )
  }

  getProfile(accessToken: string): Observable<Profile> {
    const payload: {sub: number} = jwtDecode(accessToken);
    const options = {
      headers: {
        Authorization: 'Bearer '+ accessToken
      }
    }

    return this.http.get<User>(this.baseUrl + '/users/' + payload.sub, options).pipe(
      map(user => ({accessToken, user}))
    );
  }
}
