import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BASE_URL } from '../../api/api.config';
import { User } from '../../api/api.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private http: HttpClient,

    @Inject(BASE_URL)
    private baseUrl: string,
  ) {
    console.log('INIT USERS SERVICE')
   }

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.baseUrl+'/users');
  }

  getUserById(id: number): Observable<User> {

    return this.http.get<User>(this.baseUrl+'/users/'+id);
  }
}
