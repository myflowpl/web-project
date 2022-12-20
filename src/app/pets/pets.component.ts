import { Component, inject, OnInit } from '@angular/core';
import { Pet } from '../../api-client';
import { PetsFacade } from './+state/pets.facade';
import { initialPetsState, PetsStore } from './pets.store';
import * as PetsActions from './+state/pets.actions';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
  providers: [PetsStore],
})
export class PetsComponent implements OnInit {

  store = inject(PetsStore);
  facade = inject(PetsFacade);

  ngOnInit(): void {
    this.store.load();
    this.facade.init();
  }

  handleStatusChange(e: EventTarget | null) {
    const status = (e as HTMLInputElement)?.value as Pet.StatusEnum;
    console.log('change', status)

    this.store.patchState({status});
  }

  select(pet: Pet) {
    this.facade.dispatch(PetsActions.select({pet}))
  }
}
