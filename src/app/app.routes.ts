import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'pets',
        loadComponent: () => import('./pets/pets.component').then(c => c.PetsComponent),
    },
    {
        path: 'contacts',
        loadComponent: () => import('./contacts/contacts.page').then(c => c.ContactsPage),
        canActivate: [authGuard('admin', 'user')],
        providers: [],
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.page').then(c => c.LoginPage),
    },
    {
        path: 'store',
        loadComponent: () => import('./store/store.page').then(c => c.StorePage),
    },
];
