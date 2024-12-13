import { Component, NgModule, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { MapComponent } from '../map.component';
import { CalendarComponent } from '../calendar.component';
import { VideoGameComponent } from '../video-game.component';
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

