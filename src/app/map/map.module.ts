import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPage } from './map/map.page';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { AddPage } from './add/add.page';

export const MAP_ROUTES: Routes = [
  {
    path: '',
    component: MapPage,
    children: [
      {
        path: 'add',
        component: AddPage,
      }
    ]
  },

];

@NgModule({
  declarations: [
    MapPage,
    AddPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MAP_ROUTES),
    LayoutModule,
  ]
})
export class MapModule { }
