import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
    },
    {
        path: 'contact',
        loadComponent: () => import('./contact/contact.page').then(m => m.ContactPage),
        canActivate: [
            authGuard('admin')
        ],
    },
    {
        path: 'artists',
        loadComponent: () => import('./artists/artists.page').then(m => m.ArtistsPage),
        canActivate: [
            authGuard('root')
        ],
        children: [
            {
                path: ':id',
                loadComponent: () => import('./artists/songs/songs.page').then(m => m.SongsPage)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
    }
];
