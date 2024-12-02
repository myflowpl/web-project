import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Pet, PetApi } from '../api-client';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { injectQueryParam } from '../utils';
import { PetsStore } from './pets.store';

export type Status = 'sold' | 'available' | 'pending'

@Component({
  selector: 'app-pets',
  imports: [RouterLink],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
  providers: [PetsStore],
})
export class PetsComponent {

  store = inject(PetsStore);

  status = injectQueryParam<Status>('status', 'available');

  petApi = inject(PetApi);

  pets = signal<Pet[]>([]);

  // pets$: Observable<any> | null = null;

  sub: Subscription | null = null;

  constructor() {

    this.store.filters.dir();

    effect(() => {
      const status: any = this.status();
  
      this.petApi.findPetsByStatus({
        status: [status]
      }).subscribe(pets => this.pets.set(pets));

    });

  }

  ngOnInit(): void {
    
    // this.sub = this.route.queryParamMap.pipe(
    //   switchMap(params => this.petApi.findPetsByStatus({
    //     status: [this.status()]
    //   })),
    // ).subscribe(params => {

    //   const status: any = this.status();
  
    //   this.pets$ = this.petApi.findPetsByStatus({
    //     status: [status]
    //   });
    // });
    
  }

  ngOnDestroy(): void {
    // this.sub?.unsubscribe();
  }

}
