import { Component, inject } from '@angular/core';
import { PetApi } from 'api-client';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.page.html',
  styleUrls: ['./home-user.page.scss'],
})
export class HomeUserPage {

  petApi = inject(PetApi)

  pets$ = this.petApi.findPetsByStatus({status: 'available'});

}
