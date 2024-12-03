import { Routes } from '@angular/router';

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
        canActivate: [],
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.page').then(c => c.LoginPage),
    }
];
