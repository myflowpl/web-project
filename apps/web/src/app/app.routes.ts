import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@web/home').then(m => m.HomeComponent)
    },
    {
        path: 'pet',
        loadComponent: () => import('@web/pet').then(m => m.PetPage),
        canActivate: [

        ],
        canMatch: [],
        canDeactivate: [],
    },
    {
        path: 'login',
        loadComponent: () => import('@web/auth').then(m => m.LoginPage)
    }
];
