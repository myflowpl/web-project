import { Routes } from '@angular/router';
import { authGuard, canMatchGuard } from './auth/auth.guard';
import { ContactPage } from './contact/contact.page';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./artists/artists.page').then(m => m.ArtistsPage),
        canMatch: [canMatchGuard()]
    },
    {
        path: '',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
        canMatch: []
    },
    {
        path: 'contact',
        loadComponent: () => import('./contact/contact.page').then(m => m.ContactPage),
        canActivate: [
            authGuard('admin')
        ],
        canDeactivate: [
            (com: ContactPage, b:any, c:any) => {
                if(!com.canDeactivate) {
                    inject(MatSnackBar).open('Save data before exit','', {verticalPosition: 'top', duration: 500})
                }
                return com.canDeactivate
            }
        ]
    },
    {
        path: 'artists',
        loadComponent: () => import('./artists/artists.page').then(m => m.ArtistsPage),
        canActivate: [
            authGuard('root')
        ],
        canActivateChild: [],
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
