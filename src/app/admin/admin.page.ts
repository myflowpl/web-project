import { Component, inject, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ArtistsApi, ArtistsGetRequestParams } from '@web/api-client';

@Component({
  selector: 'app-admin',
  imports: [MatPaginatorModule],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css',
})
export class AdminPage {

  artistApi = inject(ArtistsApi);

  resource = rxResource({
    params: (): ArtistsGetRequestParams => ({}),
    stream: (req) => this.artistApi.artistsGet(req.params)
  });

}
