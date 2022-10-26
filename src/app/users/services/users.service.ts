import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, merge, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { BASE_URL } from '../../api/api.config';
import { User, UserCreateResponse } from '../../api/api.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private reload$ = new Subject<User>();

  constructor(
    private http: HttpClient,

    @Inject(BASE_URL)
    private baseUrl: string,
  ) {
    console.log('INIT USERS SERVICE')
   }

  getUsers(): Observable<User[]> {

    const users$ = this.http.get<User[]>(this.baseUrl+'/users');

    const usersWithReload$ = merge(this.reload$, of(null)).pipe(
      switchMap((user) => users$ )
    );

    return usersWithReload$;
  }

  getUserById(id: number): Observable<User> {

    const user$ = this.http.get<User>(this.baseUrl+'/users/'+id);

    return this.reload$.pipe(
      filter(user => id === user.id),
      startWith(true),
      switchMap(() => user$),
    );
  }

  create(user: Omit<User, 'id'>): Observable<UserCreateResponse> {

    return this.http.post<UserCreateResponse>(this.baseUrl+'/users', user).pipe(
      tap({
        next: (res) => this.reload$.next(res.user)
      })
    );
  }
}
