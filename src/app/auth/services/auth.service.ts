import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { BASE_URL } from '../../api/api.config';
import { LoginDto, User, UserCreateResponse } from '../../api/api.model';
import { Profile } from '../auth.model';
import { ProfileStorageService } from './profile-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private profile$$ = new BehaviorSubject<Profile | null>(null);

  public user$ = this.profile$$
    .asObservable()
    .pipe(map((profile) => profile?.user || null));

  get user() {
    return this.profile$$.getValue()?.user || null;
  }

  get token() {
    return this.profile$$.getValue()?.accessToken || '';
  }

  private baseUrl = inject(BASE_URL);

  private http = inject(HttpClient);
  private profileStorage = inject(ProfileStorageService);

  constructor() {
    // read storage session
    this.profile$$.next(this.profileStorage.getProfile());

    // write profile to session on changes
    this.profile$$.subscribe((profile) =>
      this.profileStorage.setProfile(profile)
    );
  }

  register(data: Omit<User, 'id'>): Observable<UserCreateResponse> {
    return this.http.post<UserCreateResponse>(this.baseUrl + '/register', data);
  }

  login(data: LoginDto): Observable<User> {
    return this.http
      .post<UserCreateResponse>(this.baseUrl + '/login', data)
      .pipe(
        tap({
          next: (res) => {
            this.profile$$.next(res);
          }, //TODO
        }),
        map((res) => res.user)
      );
  }

  logout() {
    // TODO create server request to destroy session
    this.profile$$.next(null);
  }

  loadProfile() {
    return this.http
      .get<User[]>(this.baseUrl + '/users')
      .pipe(map((users) => users[0]));
  }
}
