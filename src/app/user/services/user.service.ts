import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../api/api.config';
import { User } from '../../api/api.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL)
    private baseUrl: string,
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }
}
