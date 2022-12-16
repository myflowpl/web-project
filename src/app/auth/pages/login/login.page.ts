import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../api/api.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  router = inject(Router);

  ngOnInit(): void {}

  handleSuccess(user: User) {
    console.log('login cucsses in page', user);
    this.router.navigateByUrl('/');
  }
}
