import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from '@web/auth';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@web/home').then(m => m.HomeComponent),
        canMatch: [ () => true ],
    },
    {
        path: '',
        loadComponent: () => import('@web/pet').then(m => m.PetPage),
        canMatch: [ () => false],
    },
    {
        path: 'pet',
        loadComponent: () => import('@web/pet').then(m => m.PetPage),
        canActivate: [
            authGuard()
        ],
        canMatch: [],
        canActivateChild: [],
        canDeactivate: [],
        children: [],
    },
    {
        path: 'login',
        loadComponent: () => import('@web/auth').then(m => m.LoginPage)
    },
    {
        path: 'contact',
        loadComponent: () => import('@web/auth').then(m => m.LoginPage)
    }
];
