import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { User } from "../api/api.models";
import { API_BASE_URL } from "../app.config";

@Injectable({providedIn: 'root'})
export class AdminService {

  constructor(
    private http: HttpClient,

    @Inject(API_BASE_URL)
    private baseUrl: string,
  ) {}

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`)
  }
}
