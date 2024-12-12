import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PetStatus } from './pet.model';
import { injectQueryParam, injectUpdateTitle } from './utils';
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

  updateTitle = injectUpdateTitle();
  
  count = signal(1);

  update() {
    this.count.update((v) => v+1);
  }

  constructor() {

    this.store.loadStatus(this.status);

    this.updateTitle(this.store.title);

    const count = this.count;

    console.log(count());

    const labels = signal(['jeden', 'dwa', 'trzy'])

    const title = computed(() => {
      console.log('COMPUTED');
      const c = count();
      const label = labels()[c] || 'to big'
      return `Liczba rekordow to: ${label}`
    })


    effect(() => {
      const c = count();
      console.log('COUNT', c);
    });

    effect(() => {
      console.log('TITLE', title());
    });


  }

}
