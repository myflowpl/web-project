import { Route } from '@angular/router';
import { ArtistsPage } from './artists/artists.page';
import { SongsPage } from './songs/songs.page';

export const musicRoutes: Route[] = [
   {
     path: '', 
     pathMatch: 'full', 
     component: SongsPage,
    }
];
