import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../api/api.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  users: User[] = [
    {id: 1, name: 'Piotr', email: 'piotr@myflow.pl'},
    {id: 2, name: 'Pawel', email: 'pawel@myflow.pl'},
    {id: 3, name: 'Justyna', email: 'justyna@myflow.pl'},
  ]

  constructor() {
    console.log('INIT USERS SERVICE')
   }

  getUsers(): Observable<User[]> {

    return of(this.users);
  }

  getUserById(id: number): Observable<User | undefined> {

    return of(this.users.find(user => user.id === id));
  }
}
