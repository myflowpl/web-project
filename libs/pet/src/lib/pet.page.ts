import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PetStatus } from './pet.model';
import { injectQueryParam } from './utils';
import { PetStore } from './pet.store';

@Component({
  selector: 'lib-pet',
  imports: [RouterLink],
  templateUrl: './pet.page.html',
  styleUrl: './pet.page.scss',
  providers: [
    PetStore,
  ],
})
export class PetPage {

  status = injectQueryParam<PetStatus>('status', 'available');

  store = inject(PetStore);
  
  constructor() {

    this.store.loadStatus(this.status);
  }

}