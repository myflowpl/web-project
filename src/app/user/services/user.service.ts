import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../api/api.model';
import { API_BASE_URL } from '../../api/api.tokens';
import jwtDecode from "jwt-decode";
import { UserStorageService } from './user-storage.service';

export interface Payload {
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$$ = new BehaviorSubject<User | null>(null);

  private token$$ = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private storage: UserStorageService,

    @Inject(API_BASE_URL)
    private base: string,
  ) {
    this.user$$.next(storage.getUser())
    this.user$$.subscribe(user => storage.setUser(user));

    this.token$$.next(storage.getToken())
    this.token$$.subscribe(token => storage.setToken(token));
   }

  getToken() {
    return this.token$$.getValue();
  }
  get user$() {
    return this.user$$.asObservable();
  }

  login(credentials: {email: string, password: string}) {

    return this.http.post<{accessToken: string}>(this.base + '/login', credentials).pipe(
      tap(res => this.token$$.next(res.accessToken)),
      map(res => jwtDecode<Payload>(res.accessToken)),
      switchMap((payload) => this.http.get<User>(this.base + '/users/'+payload.sub, {headers: {}})),
      tap(user => this.user$$.next(user)),
    )
  }

  logout() {
    this.user$$.next(null)
    this.token$$.next('')
  }
}
