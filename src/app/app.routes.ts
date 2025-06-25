import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    },
    {
        path: 'artists',
        loadComponent: () => import('./artists/artists.page').then(m => m.ArtistsPage),
    },
];
