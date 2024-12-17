import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ArtistDto } from '../api/api.model';
import { ArtistsService } from './artists.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artists',
  imports: [],
  templateUrl: './artists.page.html',
  styleUrl: './artists.page.scss'
})
export class ArtistsPage {

  router = inject(Router);
  route = inject(ActivatedRoute);

  artistsService = inject(ArtistsService);

  params = signal<ArtistDto>({_page: 1, _limit: 5});

  artists = rxResource({
    request: () => this.params(),
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
