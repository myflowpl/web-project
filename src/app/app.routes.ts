import { Routes } from '@angular/router';
// import { HomePage } from './home/home/home.page';

export const routes: Routes = [
    {
        path: '',
        // component: HomePage,
        loadComponent: () => import('./home/home/home.page').then(m => m.HomePage),
    },
    {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/register/register.page').then(m => m.RegisterPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
    }
];
