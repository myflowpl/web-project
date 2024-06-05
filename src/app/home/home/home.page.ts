import { Component, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pet, PetApi } from '../../../api-client';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {

  petApi = inject(PetApi);

  pets$ = this.petApi.findPetsByStatus({
    status: [ Pet.StatusEnum.Available ]
  });

}
