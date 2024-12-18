import { Component, inject, signal } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { User } from '../../api/api.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {

  message = signal('Login is required');

  router = inject(Router);

  handleSuccess(user: User) {
    this.router.navigateByUrl('/');
  }
}
