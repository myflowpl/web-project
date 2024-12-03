import { Component, computed, inject, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectQueryParam } from '../utils';
import { Status } from '../pets/pets.store';
import { PetApi } from '../api-client';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-store',
  imports: [RouterModule],
  templateUrl: './store.page.html',
  styleUrl: './store.page.scss'
})
export class StorePage {

  status = injectQueryParam<Status>('status', 'available');
  petApi = inject(PetApi);

  pets = rxResource({
    request: () => ({
      status: [this.status()]
    }),
    loader: ({request}) => this.petApi.findPetsByStatus(request)
  });

  error = computed(() => this.pets.error() as HttpErrorResponse | undefined);

  constructor() {
    this.pets.error()
  }
}
