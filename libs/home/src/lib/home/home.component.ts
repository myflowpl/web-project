import { Component, inject, NgModule, signal, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { MapComponent } from '../map.component';
import { CalendarComponent } from '../calendar.component';
import { VideoGameComponent } from '../video-game.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { ArtistsService } from '../artists.service';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-home',
  imports: [
    CalendarComponent,
    VideoGameComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    ngSkipHydration: 'true',
  }
})
export class HomeComponent {

  limit = signal(3);
  page = signal(1);

  artistsService = inject(ArtistsService);

  artists = rxResource({
    request: () => ({
      _limit: this.limit(),
      _page: this.page(),
    }),
    loader: ({request}) => this.artistsService.search(request)
  });

  nextPage() {
    this.page.update(page => page+1);
  }


  isVisible = false;

  mapContainer = viewChild('mapContainer', {read: ViewContainerRef});

  async renderMap() {
    const { MapComponent } = await import('../map.component');

    const componentRef = this.mapContainer()?.createComponent(MapComponent);
  }

}





//  OLD MODULES STYLE

// @Component({
//   selector: 'lib-home-comp',
//   standalone: false,
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss',
// })
// export class HomeComponentForModule {}


// @NgModule({
//   imports: [
//     CommonModule,
//     HomeComponent,
//   ],
//   declarations: [
//     HomeComponentForModule,

//   ],
// })
// export class HomeModule {}

