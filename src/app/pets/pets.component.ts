import { Component, inject } from '@angular/core';
import { PetApi } from '../api-client';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pets',
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent {

  petApi = inject(PetApi);

  pets$ = this.petApi.findPetsByStatus({
    status: ['available']
  });

}
