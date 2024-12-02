import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectQueryParam, injectUpdateTitle } from '../utils';
import { PetsStore, Status } from './pets.store';

@Component({
  selector: 'app-pets',
  imports: [RouterLink],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
  providers: [PetsStore],
})
export class PetsComponent {

  store = inject(PetsStore);

  status = injectQueryParam<Status>('status', 'available');

  updateTitle = injectUpdateTitle();

  constructor() {

    this.store.loadPets(this.status);

    this.updateTitle(this.store.title);

  }
}
