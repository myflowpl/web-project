import { Component, inject } from '@angular/core';
import { ArtistsStore } from './artists.store';
import { JsonPipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-artists',
  imports: [JsonPipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './artists.page.html',
  styleUrl: './artists.page.scss',
  providers: [ArtistsStore],
})
export class ArtistsPage {
  store = inject(ArtistsStore);


    ngOnInit(): void {
        this.store.load();
    }
}
