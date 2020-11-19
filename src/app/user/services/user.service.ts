import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../api/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$$ = new BehaviorSubject<User | null>(null);

  constructor() { }

  get user$() {
    return this.user$$.asObservable();
  }

  login() {
    
  }
}
