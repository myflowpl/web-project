import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPage } from './map/map.page';
import { RouterModule, Routes } from '@angular/router';

export const MAP_ROUTES: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  declarations: [
    MapPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MAP_ROUTES),
  ]
})
export class MapModule { }
