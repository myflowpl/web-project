import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'test',
        component: HomePage,
    },
    {
        path: 'test/:id',
        component: HomePage,
    }
];
