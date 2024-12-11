import { Component, inject, Injectable } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PetApi } from '@web/api-client';

@Injectable()
class TestApi {}

@Component({
  selector: 'lib-pet',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './pet.page.html',
  styleUrl: './pet.page.scss',
  providers: [
    TestApi,
  ],
})
export class PetPage {

  testApi = inject(TestApi);
  petApi = inject(PetApi);

  pets$ = this.petApi.findPetsByStatus({
    status: ['available'],
  });

}
