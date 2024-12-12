import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PetStatus } from './pet.model';
import { injectQueryParam$ } from './utils';
import { PetStore } from './pet.cstore';

@Component({
  selector: 'lib-pet',
  imports: [AsyncPipe, RouterLink, NgIf],
  templateUrl: './pet.page.html',
  styleUrl: './pet.page.scss',
  providers: [
    PetStore,
  ],
})
export class PetPage {

  status$ = injectQueryParam$<PetStatus>('status', 'available');

  store = inject(PetStore);
  
  constructor() {
    this.store.setStatus(this.status$);
  }

}