import { Component, viewChild, ViewContainerRef } from '@angular/core';
// import { MapComponent } from './map/map.component';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  imports: [ CalendarComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class HomeComponent {

  isVisible = false;

  mapContainer = viewChild('mapContainer', {read: ViewContainerRef});

  async loadMap() {
    const { MapComponent } = await import('./map/map.component');

    const lazyComponentRef = this.mapContainer()?.createComponent(MapComponent);
  }
}
