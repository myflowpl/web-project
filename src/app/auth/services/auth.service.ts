import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../api/api.config';
import { User, UserCreateResponse } from '../../api/api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = inject(BASE_URL);

  http = inject(HttpClient);

  register(data: Omit<User, 'id'>): Observable<UserCreateResponse> {
    return this.http.post<UserCreateResponse>(this.baseUrl+'/register', data)
  }
}
