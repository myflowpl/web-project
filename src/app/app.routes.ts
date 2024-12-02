import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'pets',
        loadComponent: () => import('./pets/pets.component').then(c => c.PetsComponent),
    }
];
