import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { BASE_URL } from '../../api/api.config';
import { LoginDto, Profile } from '../auth.model';

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
    private http: HttpClient,
    @Inject(BASE_URL)
    private baseUrl: string,
  ) { }

  login(data: LoginDto): Observable<Profile> {
    return this.http.post<Profile>(this.baseUrl+'/login', data).pipe(
      tap(profile => this.profile$$.next(profile)),
    )
  }

  logout() {
    this.profile$$.next(null);
  }
}
