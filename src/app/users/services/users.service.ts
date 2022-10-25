import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../api/api.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) {
    console.log('INIT USERS SERVICE')
   }

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUserById(id: number): Observable<User> {

    return this.http.get<User>('http://localhost:3000/users/'+id);
  }
}
