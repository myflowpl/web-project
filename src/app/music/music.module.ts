import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { AModule } from '../shared/a/a.module';
import { BModule } from '../shared/b/b.module';
import { CModule } from '../shared/c/c.module';


@NgModule({
  declarations: [
    MusicComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    AModule,
    BModule,
    CModule,
  ]
})
export class MusicModule { }
