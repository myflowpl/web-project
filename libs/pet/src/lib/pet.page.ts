import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PetStatus } from './pet.model';
import { injectQueryParam, injectUpdateTitle } from '@web/utils';
import { PetStore } from './pet.store';
import { injectPetFormDialog } from './pet-form/pet-form.dialog';

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

  connectUpdateTitle = injectUpdateTitle();

  petFormDialog = injectPetFormDialog();
  
  count = signal(1);

  update() {

    this.petFormDialog.open({}).subscribe(
      data => console.log('FORM CLOSE DATA', data)
    )

    this.count.update((v) => v+1);
  }

  constructor() {

    this.store.connectLoadStatus(this.status);

    this.connectUpdateTitle(this.store.title);

    effect(() => this.connectUpdateTitle(this.store.title()))

    const count = this.count;

    console.log(count());

    const labels = signal(['jeden', 'dwa', 'trzy'])

    const title = computed(() => {
      // console.log('COMPUTED');
      const c = count();
      if(c > 3) {
        const status = this.status()
        console.log(status);
      }
      const label = labels()[c] || 'to big'
      return `Liczba rekordow to: ${label}`
    })


    effect(() => {
      const c = count();
      // console.log('COUNT', c);
    });

    effect(() => {
      // console.log('TITLE', title());
    });


  }

}
