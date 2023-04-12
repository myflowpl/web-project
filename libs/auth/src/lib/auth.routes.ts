import { Route } from '@angular/router';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

export const authRoutes: Route[] = [
  {
    path: '', 
    pathMatch: 'full', 
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  }
];
