import { Component, inject, OnInit } from '@angular/core';
import { Pet } from '../../api-client';
import { initialPetsState, PetsStore } from './pets.store';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
  providers: [PetsStore],
})
export class PetsComponent implements OnInit {

  store = inject(PetsStore);

  ngOnInit(): void {
    this.store.load();
  }

  handleStatusChange(e: EventTarget | null) {
    const status = (e as HTMLInputElement)?.value as Pet.StatusEnum;
    console.log('change', status)

    this.store.patchState({status});
  }
}
