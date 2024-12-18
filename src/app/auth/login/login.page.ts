import { Component, inject, signal } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { User } from '../../api/api.model';
import { Router } from '@angular/router';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    LoginFormComponent, 
    CommonModule,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {

  flag = false;

  message = signal('Login is required');

  router = inject(Router);

  handleSuccess(user: User) {
    this.router.navigateByUrl('/');
  }
}
