import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectConfig } from '../app.tokens';
import { LoginDto, LoginResponse, RegisterDto } from '../api/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)
  baseUrl = injectConfig().baseUrl;

  login(data: LoginDto) {
    return this.http.post<LoginResponse>(this.baseUrl+'/login', data)
  }

  register(data: RegisterDto) {
    return this.http.post<LoginResponse>(this.baseUrl+'/register', data)
  }
}
