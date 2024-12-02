import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Pet, PetApi } from '../api-client';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { injectQueryParam } from '../utils';

export type Status = 'sold' | 'available' | 'pending'

@Component({
  selector: 'app-pets',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent implements OnInit {

  status = injectQueryParam<Status>('status', 'available');

  // route = inject(ActivatedRoute);

  petApi = inject(PetApi);

  pets = signal<Pet[]>([]);

  // pets$: Observable<any> | null = null;

  sub: Subscription | null = null;

  constructor() {

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
