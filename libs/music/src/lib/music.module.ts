import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { musicRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(musicRoutes),
    RouterModule.forChild(musicRoutes),
  ],
})
export class MusicModule {}
