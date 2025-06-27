import { Component, effect, inject, model, resource, signal, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ArtistsApi, ArtistsGetRequestParams } from '@web/api-client';

@Component({
  selector: 'app-admin',
  imports: [MatPaginatorModule, FormsModule],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css',
})
export class AdminPage {

  artistApi = inject(ArtistsApi);

  q = model('');
  pageIndex = model<number>(0);
  pageSize = signal<number>(3);

  resource = rxResource({
    params: (): ArtistsGetRequestParams => ({
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
      q: this.q()
    }),
    stream: (req) => this.artistApi.artistsGet(req.params)
  });

  constructor() {
    effect(() => {
      console.log('m', this.q())
    })
  }

  handlePage(page: PageEvent) {
    this.pageIndex.set(page.pageIndex);
  }
}
