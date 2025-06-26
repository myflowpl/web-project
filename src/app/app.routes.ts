import { Routes } from '@angular/router';
import { QuotesApi } from '@web/api-client';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    },
    {
        path: '',
        providers: [QuotesApi],
        children: [
            {
                path: 'artists',
                loadComponent: () => import('./artists/artists.page').then(m => m.ArtistsPage),
            },
            {
                path: 'artists',
                loadComponent: () => import('./artists/artists.page').then(m => m.ArtistsPage),
            },

        ]
    }
];
