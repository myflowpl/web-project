import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ArtistsService } from './artists.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-artists',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './artists.page.html',
  styleUrl: './artists.page.scss'
})
export class ArtistsPage {

  router = inject(Router);
  route = inject(ActivatedRoute);

  artistsService = inject(ArtistsService);

  q = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('q') || ''),
      filter(q => !!q),
      map(q => q),
    ),
    {initialValue: ''}
  );

  artists = rxResource({
    request: () => ({
      q: this.q(),
      _limit: 5,
      _page: 1,
    }),
    loader: ({request}) => this.artistsService.getArtists(request)
  });

  handleSubmit(event: Event, q: string) {
    event.preventDefault();

    this.router.navigate(['.'], {
      queryParams: { q },
      relativeTo: this.route
    })
  }
}
