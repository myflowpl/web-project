import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistListPage } from './pages/artist-list/artist-list.page';
import { ImageUrlPipe } from './pipes/image-url.pipe';


@NgModule({
  declarations: [
    ArtistListPage,
    ImageUrlPipe
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule
  ]
})
export class ArtistsModule { }
