import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
    },
    {
        path: 'contact',
        loadComponent: () => import('./contact/contact.page').then(m => m.ContactPage),
    },
    {
        path: 'artists',
        loadComponent: () => import('./artists/artists.page').then(m => m.ArtistsPage),
        children: [
            {
                path: ':id',
                loadComponent: () => import('./artists/songs/songs.page').then(m => m.SongsPage)
            }
        ]
    }
];
