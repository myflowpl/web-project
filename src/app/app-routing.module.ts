import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomePage } from './pages/home/home.page';
import { ItemsPage } from './pages/items/items.page';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: {
      header: HeaderComponent
    },
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
      },
      {
        path: 'items',
        component: ItemsPage,
        data: {
          header: HeaderComponent
        },
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
