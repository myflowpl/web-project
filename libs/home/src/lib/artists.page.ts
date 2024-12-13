import { Component, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ArtistsStore } from './artists.store';
import { StorePaginatorDirective } from '@web/utils';

@Component({
  selector: 'lib-artists',
  imports: [
    MatPaginatorModule,
    StorePaginatorDirective,
  ],
  templateUrl: './artists.page.html',
  styleUrl: './artists.page.scss',
  providers: [
    ArtistsStore,
  ],
})
export class ArtistsPage {

  store = inject(ArtistsStore);
  c = this.store.length()
}
